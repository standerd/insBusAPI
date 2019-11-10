# finalCapstone

## Note this project uses the HTML5 Date Picker type input, it is only fully supported in Google Chrome, please use the application in Google Chrome only.

# How to Use the Project Locally

Copy the project folder to your local machine.

1. Navigate to the project folder and run NPM Install.
2. Once the installation is complete navigate to the client directory (cd client) and run NPM Install.
3. Once the installation is completed run "npm run dev" in the main folder directory this will start the Node JS server.
4. Once this is started navigate to the client folder in a seperate terminal window run "npm start", this will start the React server.
5. This should open localhoste:3000, however if it does not open Google Chrome and go to http://localhost:3000.

# Base testing data

1. Admin login, username= "admin" password="password
2. User login, email="teststander@gmail.com" password="password"
3. Property login, email="teststander@gmail.com" password="password" --- Property name if you want to test booking "MyTestProp" city="Johannesburg"
4. Or feel free to create a new user account or sign in with Facebook or Google. You can also register your own property if you want.

# Project Overview

This is a Booking.com type clone.

It allows for registration of users and for them to search for properties in specific cities.

Users are also able to login via Facebook and Google Oauth rather then registering a new account and logging in.

It also allows for registration of accommodation entities. Entities are able
to register their property, upload images of the property and also manage their accomodation availability.

There is also an admin login functionality for the site admin to login, they can view users, properties and bookings.

The site uses the Google Maps API, it geocodes entity addresses on registration and uses the geocoded co-ordinates to
display properties on a map for the user when searching.

The project ships with 6 x Properties that are set by default. 3 in Johannesburg and 3 in Cape
Town for testing purposes.

All data is store in MongoDB, the Client Side Code is rendered via React App and the Server side is handled by Node.js.

All API keys are secured via a config file and no API keys are contained directly inside and publicaly accessible browser code.

THE APPLICATION CONNECTS TO A DATABASE AND THE GOOGLE MAPS API, THE PROJECT WILL NOT WORK WITHOUT A INTERNET CONNECTION.
