const { validationResult } = require("express-validator");
const Entity = require("../models/enitySchema");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Booking = require("../models/booking");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { OAuth2Client } = require("google-auth-library");
const KEY = require("../config/keys");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const request = require("request");
const requestPromise = require("request-promise");

const client = new OAuth2Client(KEY.keys.googleLogin);

//nodemailer client setup.
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: KEY.keys.mailer
    }
  })
);

//user login handler.
exports.postLogin = (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  let loadedUser;

  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        const error = new Error("User not Found");
        error.statusCode = 401;
        throw error;
      }

      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(isMatch => {
      if (!isMatch) {
        const error = new Error("Incorrect Password");
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        { email: loadedUser.email, userId: loadedUser._id, type: "user" },
        "thisBookingsDotComSecret",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        userId: loadedUser._id,
        type: "user"
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// google login handler
exports.postGoogleLogin = async (req, res, next) => {
  //a token is received from the client that Google returns when the user clicks on the google
  //sign in button. This is sent to the server as part of the request.
  const token = req.body.token;

  //if the google verification fails and error message is received and handled by the catch method.
  try {
    //the token that is received is validated via the google verification method provided
    //by them on the website.
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: KEY.keys.googleLogin
    });
    const payload = await ticket.getPayload();

    // first check if the google id exists in the user database, if it does not the user is
    // registered and then logged in automatically. If the user is found the user is logged in.

    // NOTE - THIS IS WRONG - I only have access to my own gmail login account and I am also
    // registering a user using my gmail e-mail address, so if I check Google sign against e-mail
    // I cannot test it, so I am using the google Id to test with and creating a gmail field in the
    // DB to avoid clashing on Google and normal log in. In a production environment E-Mail should be used to ensure
    // that users cannot register 2 accounts.

    //the login process is exactly the same on the user is authenticated as with local sign in. A JWT token is
    //sent to the client and validated on return.
    User.findOne({ googleId: payload.sub }).then(user => {
      if (!user) {
        const newUser = new User({
          name: payload.given_name,
          surname: payload.family_name,
          gmail: payload.email,
          googleId: payload.sub
        });
        return newUser
          .save()
          .then(result => {
            const token = jwt.sign(
              { email: result.gmail, userId: result._id, type: "user" },
              "thisBookingsDotComSecret",
              { expiresIn: "1h" }
            );
            res.status(200).json({
              message: "User Logged In",
              token: token,
              userId: result._id,
              type: "user"
            });
          })
          .catch(err => console.log(err));
      } else {
        const token = jwt.sign(
          { email: user.gmail, userId: user._id, type: "user" },
          "thisBookingsDotComSecret",
          { expiresIn: "1h" }
        );
        res.status(200).json({
          message: "User Logged In",
          token: token,
          userId: user._id,
          type: "user"
        });
      }
    });
  } catch {
    console.log("There was an error");
    res.json({ message: "There was an error with authenticating you" });
  }
};

// facebook login handler
exports.postFacebookLogin = (req, res, next) => {
  //a token is received from the client that Facebook returns when the user clicks on the facebook
  //sign in button. This is sent to the server as part of the request.
  const token = req.body.token;
  const { name, email, userID } = req.body;

  //set facebook login validation request params
  const clientId = KEY.keys.clientId;
  const clientSecret = KEY.keys.clientSecret;
  const appLink =
    "https://graph.facebook.com/debug_token?input_token=" +
    token +
    "&access_token=" +
    clientId +
    "|" +
    clientSecret;

  try {
    //The token received from the client is sent to the facebook authentication API to check the
    //validity, if valid the login or registration process is continued else and error is sent.
    request.get(appLink, (error, response, body) => {
      let myData = JSON.parse(body);

      let isValid = myData.data.is_valid;

      // first check if the facebook id exists in the user database, if it does not the user is
      // registered and then logged in automatically. If the user is found the user is logged in.

      // NOTE - THIS IS WRONG - Similar to the google login issue, I only have access to my own Facebook
      // account and am therefore check against Facebook ID and not email. For production this would need
      // to be done differently.

      //check if the token verification response
      if (isValid) {
        User.findOne({ facebookId: userID }).then(user => {
          if (!user) {
            const newUser = new User({
              name: name.split(" ")[0],
              surname: name.split(" ")[1],
              fmail: email,
              facebookId: userID
            });
            return newUser
              .save()
              .then(result => {
                const token = jwt.sign(
                  { email: result.fmail, userId: result._id, type: "user" },
                  "thisBookingsDotComSecret",
                  { expiresIn: "1h" }
                );
                res.status(200).json({
                  message: "User Logged In",
                  token: token,
                  userId: result._id,
                  type: "user"
                });
              })
              .catch(err => console.log(err));
          } else {
            const token = jwt.sign(
              { email: user.fmail, userId: user._id, type: "user" },
              "thisBookingsDotComSecret",
              { expiresIn: "1h" }
            );
            res.status(200).json({
              message: "User Logged In",
              token: token,
              userId: user._id,
              type: "user"
            });
          }
        });
      } else {
        console.log("The token is not valid");
        res
          .status(422)
          .json({ message: "There was an error with authenticating you" });
      }
    });
  } catch {
    console.log("There was an error");
    res
      .status(422)
      .json({ message: "There was an error with authenticating you" });
  }
};

// post Register handles the user registration
exports.postRegister = (req, res, next) => {
  //destructure incoming data from client fetch request
  const { name, surname, email, password, telNo, altNo } = req.body;

  // see if the user database already contains a user with the email address, if
  //it exists a error is sent to the user, else the user is registered in the database
  User.findOne({ email: email })

    .then(user => {
      if (user) {
        const error = new Error("User Already Exists");
        error.statusCode = 401;
        throw error;
      } else {
        bcrypt
          .hash(password, 12)
          .then(hashedPW => {
            const newUser = new User({
              name,
              surname,
              email,
              password: hashedPW,
              telNo,
              altNo
            });
            return newUser.save();
          })
          .then(result => {
            //send an email confirmation to the user confirming that the registration was successful.
            transporter.sendMail({
              to: email,
              from: "traveller@travelling.co.za",
              subject: "Signup succeeded!",
              html:
                "<h1>You successfully signed up!</h1><p>Thanks for signing up you can now login to your account with your account details and make bookings</p>"
            });
            res.status(200).json({ message: "Entity Succesfully Saved" });
          })
          .catch(err => res.status(500).json({ message: "Server Error" }));
      }
    })

    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// The post search fun tion is called when a user submits a search request, it receives a
// lat/lng parameter and return all properties withing a 30km radius from the search params.

exports.postSearch = async (req, res, next) => {
  let lat = req.body.lat;
  let lng = req.body.lng;

  //Find all entities in the database and return the result
  let entity = await Entity.find();

  //Loop through all the returned entities and find properties that are in a range of 30 km from the the users
  //search city coordinates - I think this needs some refactoring as it will be slow if the database is large.
  let myFuntion = () => {
    return Promise.all(
      entity.map(async key => {
        let distance = await requestPromise.get(
          `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${lat},${lng}&destinations=${key.lat},${key.long}&key=${KEY.keys.google}`
        );
        if (
          JSON.parse(distance).rows[0].elements[0].distance.value / 1000 <
          30
        ) {
          return key;
        } else {
          return null;
        }
      })
    );
  };

  myFuntion()
    .then(data => {
      //removes all nulls retured from map, I have not been able to get this working in one function
      //to review at some point.
      let sendingData = data.reduce((sendingData, key) => {
        if (key !== null) {
          sendingData.push(key);
        }
        return sendingData;
      }, []);

      if (sendingData.length === 0) {
        res.status(404).json({
          message: "We could not find any properties for your search",
          results: null
        });
      } else res.status(200).json({ results: sendingData });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Server Error" });
    });
};

// Postbooking is called when the user submit the final booking form,
// this writes the booking to the bookings database, the bookings database
// contains both the user and property id's for ease of future queries

exports.postBooking = (req, res, next) => {
  // destructure the data coming in via the client fetch request
  const {
    userId,
    propertyId,
    checkInDate,
    checkOutDate,
    guestCount,
    totalBookingCost,
    bookingDate,
    street,
    city,
    country,
    postal,
    bookingArray,
    destination,
    imageSrc,
    entityName,
    email,
    name,
    contact
  } = req.body;

  // update the entity booked availability array to ensure that it cannot be booked a second time.
  Entity.updateOne(
    { _id: propertyId },
    { $push: { availability: { $each: bookingArray } } }
  ).catch(err => console.log(err));

  // write the booking to the database
  const newBooking = new Booking({
    userId,
    propertyId,
    checkInDate,
    checkOutDate,
    guestCount,
    totalBookingCost,
    bookingDate,
    street,
    city,
    country,
    postal,
    destination,
    imageSrc,
    entityName,
    name,
    email,
    contact
  });

  return (
    newBooking
      .save()

      //return the booking id to the client for confirmation purposes.
      .then(result => {
        //send the user an email with their booking details.
        transporter.sendMail({
          to: email,
          from: "traveller@travelling.co.za",
          subject: "Booking Successful",
          html: `<h1>Booking Successful</h1><p>Thank you for your booking</p><p>Booking Reference No: ${result._id}</p><p>Property Name: ${entityName}</p><p>Check In Date: ${checkInDate}</p><p>Check Out Date: ${checkOutDate}</p><p>Cost: R ${totalBookingCost}</p><p>No of Guests: ${guestCount}</p>`
        });
        res.status(200).json({
          message: "Booking Succesfully Created",
          booking: result._id
        });
      })
      .catch(err => console.log(err))
  );
};

//get booking function, get Request from the client, finds all bookings for the user in
//the database and sends the a response containing all the usersbookings.
exports.getBookings = (req, res, next) => {
  Booking.find({ userId: req.userId })
    .then(result => {
      if (!result) {
        res.status(500).json({ data: "No Bookings Found for User" });
      } else {
        res.status(200).json({ bookings: result });
      }
    })
    .catch(err => console.log(err));
};

// if the users clicks on booking details from withing his booking manager, a request
//is sent here to fetch the property details for the user to see displayed.
exports.getProperty = (req, res, next) => {
  let property = req.params.propId;

  Entity.findOne({ _id: property })
    .then(result => res.status(200).json({ details: result }))
    .catch(err => console.log(err));
};

// booking delete function, if a user wishes to delete a booking, a request is sent from
//the client to this endpoint and the booking is deleted.
exports.deleteBooking = (req, res, next) => {
  let bookId = req.body.bookingID;
  let occupation = req.body.occupation;
  let enityID = req.body.entityID;

  Booking.findOneAndDelete({ _id: bookId })
    .then(result => {
      //the booking is not only removed from the bookings collection but the entity availability data
      //is also updated to make the date range available again for future bookings.
      Entity.updateMany(
        { _id: enityID },
        { $pull: { availability: { $in: occupation } } },
        { multi: true }
      )
        .then(result =>
          res.status(200).json({ message: "Booking has been deleted" })
        )
        .catch(err =>
          res.status(404).json({ message: "Could not complete delete" })
        );
    })
    .catch(err =>
      res.status(404).json({ message: "Could not complete delete" })
    );
};

// users can ammend the dates and guest count of their bookings. This endpoint handles
// the users request data and updates the booking and entity database collections accordingly.
exports.ammendBooking = (req, res, next) => {
  let bookId = req.body.bookingID;
  let currentOcc = req.body.currentOcc;
  let occupation = req.body.occupation;
  let checkIn = req.body.checkIn;
  let checkOut = req.body.checkOut;
  let guestCount = req.body.guestCount;
  let entityID = req.body.entityID;

  Entity.findOne({ _id: entityID })
    .then(result => {
      //before doing the check for availability on the changed dates, the old booking dates are removed
      //from the availability data received from the Database and that is then used to compare against
      //else the user can never book within the period booked by himself again.
      let isAvailable = false;
      let availableDates = result.availability;
      let index = availableDates.indexOf(currentOcc[0]);
      let length = currentOcc.length;
      availableDates.splice(index, length);

      for (let i = 0; i < availableDates.length; i++) {
        if (isAvailable) {
          break;
        }
        isAvailable = availableDates.includes(occupation[i]);
      }

      if (!isAvailable) {
        //remove the current occupation from the entity availability in the DB.
        Entity.updateOne(
          { _id: entityID },
          { $pull: { availability: { $in: currentOcc } } },
          { multi: true }
        ).catch(err => console.log(err));
        Entity.updateOne(
          { _id: entityID },
          { $push: { availability: { $each: occupation } } }
        ).catch(err => console.log(err));
        Booking.updateOne(
          { _id: bookId },
          {
            $set: {
              checkInDate: checkIn,
              checkOutDate: checkOut,
              guestCount: guestCount
            }
          }
        ).catch(err => console.log(err));
        res.status(200).json({ message: "We have space for you" });
      } else {
        res.status(404).json({ message: "We do not have space sorry" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Could not find the booking, please try again later."
      });
    });
};

// the user is able to contact the property from within his booking manager, this sends an
// email to the entity.
exports.postContact = (req, res, next) => {
  const { userID, message, email, bookID } = req.body;

  // user is looked up from the database to get the user details for display on the email body,
  User.findOne({ _id: userID })
    .then(data => {
      transporter.sendMail({
        //entity registrations were done with fake email addressed, therefore the email to is hardcoded so not
        //to send random emails around. Functionality exists for obtaining the email from the request body.
        to: "stander.dewald@gmail.com",
        from: data.email,
        subject: "New Booking Message",
        html: `<h1>New Message From: ${data.name} ${data.surname}</h1><p>Booking Number: ${bookID}</p><p>Message: </p><p>${message}</p><p>Please respond directly to the user from this mail.</p><p>Regards The Travelling Team</p>`
      });
      res.status(200).json({ data: "Message was sent successfully" });
    })
    .catch(err => res.status(500).json({ data: "There was an error" }));
};

// this has been left on purpose, I want to try and refactor the search functionality

// exports.postPlay = async (req, res, next) => {
//   let lat = req.body.lat;
//   let lng = req.body.lng;

//   let entity = await Entity.find();

//   let myFuntion = () => {
//     return Promise.all(
//       entity.map(async key => {
//         let distance = await requestPromise.get(
//           `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${lat},${lng}&destinations=${key.lat},${key.long}&key=${KEY.keys.google}`
//         );
//         if (
//           JSON.parse(distance).rows[0].elements[0].distance.value / 1000 <
//           30
//         ) {
//           return key;
//         } else {
//           return null;
//         }
//       })
//     );
//   };

//   myFuntion().then(data => {
//     console.log(data);
//     res.send(data);
//   });
// };
