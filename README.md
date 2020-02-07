# Booking API

This Repo consists only of the Rest API code, the code is deployed and run on an AWS EC2 instance, and has a React Client connecting to it.

The React Client code is contained in a repo called bookingClient. You can clone that Repo to have it communicate with the live EC2 server instance, alternatively if you would like to work with it locally you would need to ammend the fetch requests to point to a local proxy.

The same project is also available as a full repo, however with the old interface. Please look at the finalCapstone repo and follow the instructions in the repo to use it locally.

# How to Use the Project Locally

Copy the project folder to your local machine.

1. Navigate to the project folder and run NPM Install..
2. Once the installation is completed run "npm run dev" in the main folder directory this will start the Node JS server.

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
