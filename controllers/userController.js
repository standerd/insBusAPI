const bcrypt = require("bcryptjs");
const db = require("../models");
const BussUser = db.BussUser;
const jwt = require("jsonwebtoken");
const KEY = require("../config/keys");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const { Expo } = require("expo-server-sdk");
const io = require("../socket");

// Create a new Expo SDK client
const expo = new Expo();

//nodemailer client setup.
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: KEY.keys.mailer
    }
  })
);

/* 
---------------------------------
Insurance Business User Handler
---------------------------------
*/

// Business User Registration
exports.postRegister = (req, res, next) => {
  //destructure incoming data from client fetch request
  const { name, surname, id, employeeNo, email, telNo, role } = req.body;

  BussUser.findAll({ where: { employee_no: employeeNo } })
    .then(user => {
      if (user.length > 0) {
        res.send(
          `User with employee no ${employeeNo} already exists in the database`
        );
      } else {
        bcrypt
          .hash("password", 12)
          .then(hashedPwd => {
            return BussUser.create({
              first_name: name,
              last_name: surname,
              id_no: id,
              employee_no: employeeNo,
              email: email,
              tel_no: telNo,
              role: role,
              password: hashedPwd,
              validated: "false"
            });
          })
          .then(data => res.send("User was created successfully"))
          .catch(err => {
            console.log(err);
            res.send(
              "There was an error loading the user in the database, please try again later."
            );
          });
      }
    })
    .catch(err =>
      res.send(
        "There was an error with trying to find the user in the database"
      )
    );
};

// Business User Login
exports.postLogin = (req, res, next) => {
  const { employeeNo, password } = req.body;
  let loadedUser;

  BussUser.findAll({ where: { employee_no: employeeNo } }).then(user => {
    if (user.length < 1) {
      return res.status(400).send("Incorrect Login Details Supplied");
    }
    loadedUser = user[0].dataValues;

    bcrypt
      .compare(password, loadedUser.password)
      .then(isMatch => {
        if (!isMatch) {
          res.status(400).send("Incorrect Login Details Supplied - password");
        } else if (loadedUser.validated === "false") {
          const token = jwt.sign(
            {
              employeeNo: loadedUser.employee_no,
              role: loadedUser.role
            },
            "businessEmployeeLogin",
            { expiresIn: "1h" }
          );
          res.status(401).send({
            message: "User not yet activated, redirect to ammend password",
            token: token,
            employeeNo: employeeNo
          });
        } else {
          const token = jwt.sign(
            {
              employeeNo: loadedUser.employee_no,
              role: loadedUser.role
            },
            "businessEmployeeLogin",
            { expiresIn: "1h" }
          );
          res.status(200).send({
            token: token,
            role: loadedUser.role
          });
        }
      })
      .catch(err =>
        res
          .status(404)
          .send("There was an error with the decrypting of the password")
      );
  });

  // return bcrypt.compare(password, user.password);
  // .then(isMatch => {
  //   if (!isMatch) {
  //     const error = new Error("Incorrect Password");
  //     error.statusCode = 401;
  //     throw error;
  //   }
  //   const token = jwt.sign(
  //     {
  //       email: loadedUser.email,
  //       userId: loadedUser._id,
  //       propId: loadedUser.propId,
  //       isAdmin: loadedUser.isAdmin
  //     },
  //     "thisBookingsDotComSecret",
  //     { expiresIn: "1h" }
  //   );
  //   res.status(200).json({
  //     token: token,
  //     userId: loadedUser._id,
  //     isAdmin: loadedUser.isAdmin,
  //     propId: loadedUser.propId
  //   });
  // })
  // .catch(err => {
  //   if (!err.statusCode) {
  //     err.statusCode = 500;
  //   }
  //   next(err);
  // });
};

// Business User Activate Account
exports.postActivateAccount = (req, res, next) => {
  const { password } = req.body;
  const { employeeNo } = req;

  bcrypt
    .hash(password, 12)
    .then(hashedPW => {
      return BussUser.update(
        { password: hashedPW, validated: "true" },
        {
          where: {
            employee_no: employeeNo
          }
        }
      );
    })
    .then(data => res.status(200).send("Password Successfully Updated"))
    .catch(err =>
      res
        .status(400)
        .send("There was an error with the request, please try again later")
    );
};

/* 
--------------------------------------
Insurance Client User Login Handler
--------------------------------------
*/
// exports.postLogin = (req, res, next) => {
//   let email = req.body.email;
//   let password = req.body.password;
//   let loadedUser;

//   console.log(req.body);

//   User.findOne({ email: email })
//     .then(user => {
//       if (!user) {
//         const error = new Error("User not Found");
//         error.statusCode = 401;
//         throw error;
//       }

//       if (!user.validated) {
//         const error = new Error("Email address not validated");
//         error.statusCode = 422;
//         throw error;
//       }

//       loadedUser = user;
//       return bcrypt.compare(password, user.password);
//     })
//     .then(isMatch => {
//       if (!isMatch) {
//         const error = new Error("Incorrect Password");
//         error.statusCode = 401;
//         throw error;
//       }
//       const token = jwt.sign(
//         {
//           email: loadedUser.email,
//           userId: loadedUser._id,
//           propId: loadedUser.propId,
//           isAdmin: loadedUser.isAdmin
//         },
//         "thisBookingsDotComSecret",
//         { expiresIn: "1h" }
//       );
//       res.status(200).json({
//         token: token,
//         userId: loadedUser._id,
//         isAdmin: loadedUser.isAdmin,
//         propId: loadedUser.propId
//       });
//     })
//     .catch(err => {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       next(err);
//     });
// };

// post Register handles the user registration
// exports.postRegister = (req, res, next) => {
//destructure incoming data from client fetch request
// const { name, email, password, telNo, validated, isAdmin } = req.body;

// see if the user database already contains a user with the email address, if
//it exists a error is sent to the user, else the user is registered in the database
// User.findOne({ email: email })

//   .then(user => {
//     if (user) {
//       const error = new Error("User Already Exists");
//       error.statusCode = 401;
//       throw error;
//     } else {
//       bcrypt
// .hash(password, 12)
// .then(hashedPW => {
//   const newUser = new User({
//     name,
//     email,
//     password: hashedPW,
//     telNo,
//     validated,
//     isAdmin
//   });
//   return newUser.save();
// })
// .then(result => {
//send an email confirmation to the user confirming that the registration was successful.
//         transporter.sendMail({
//           to: email,
//           from: "traveller@travelling.co.za",
//           subject: "Signup succeeded!",
//           html:
//             "<h1>You successfully signed up!</h1><p>Thanks for signing up you can now login to your account with your account details and make bookings</p>"
//         });
//         res.status(200).json({ message: "Entity Succesfully Saved" });
//       })
//       .catch(err => {
//         console.log(err);
//         res.status(500).json({ message: "Server Error" });
//       });
//   }
// })

//     .catch(err => {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       next(err);
//     });
// };
