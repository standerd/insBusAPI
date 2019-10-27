# finalCapstone

NOTE THIS PROJECT IS NOT YET COMPLETED, AS VERY BASIC VERSION IS WORKING CURRENTLY. USER INTERFACE DESIGN IS STILL IN DRAFT.

This is a Booking.com type clone. It allows for registration of users as well as accommodation entities. Entities are able
to register their property, upload images of the property and also manage their accomodation availability.

There is also an admin login functionality for the site admin to login, they can manage users, properties and also run queries
on the commission they have earned on the bookings that were processed via the site.

The site using the Google Maps API a bit, it geocodes entity addresses on registration and uses the geocoded co-ordinates to
display properties on a map for the user when search. Properties that are set by default are 3 in Johannesburg and 3 in Cape
Town for testing purposes.

All data is store in MongoDB, the Client Side Code is rendered via React App and the Server side is handled by Node.js.

All API keys are secured via a config file and no API keys are contained directly inside and publicaly accessible browser code.

Users are able to sign up and login via local authentication or Google / Facebook's Oauth technology.

In order to use the software locally, copy the project folder to your local machine.

Navigate to the main project folder and run NPM INSTALL, this will install the server side dependancies. Once this is completed
Navigate to the client folder (cd client) and run NPM INSTALL, this will install all the client side dependancies.

Once the installation is completed, run NPM START in both the client and main project directory to start the client server as 
well as the Node JS server.

THE APPLICATION CONNECTS TO A DATABASE AND THE GOOGLE MAPS API, THE PROJECT WILL NOT WORK WITHOUT A INTERNET CONNECTION.
