const express = require("express");
const db = require("./models");
const KEYS = require("./config/keys");
const bodyParser = require("body-parser");
const multer = require("multer");
const PORT = process.env.PORT || 3001;
const ClientRoute = require("./routes/ClientRoute/ClientRoute");
const UserAuth = require("./routes/UserRoute/UserAuth");
const path = require("path");
const socketIO = require("socket.io");

/* 
-------------------------------
Intitialise Express App
-------------------------------
*/

const app = express();

/* 
-------------------------------------
Intitialise Postgres SQL Database
-------------------------------------
*/

db.sequelize
  .sync({ force: false, alter: true })
  .then(() => console.log("Drop and Sync"));

/* 
-------------------------------
Setup Body Parser
-------------------------------
*/

app.use(bodyParser.json());

/* 
--------------------------------------------------
Multer Setup for file and image upload handling
--------------------------------------------------
*/

// image file handling logic
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  }
});

// set type of files allowed
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// set file upload middleware.
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

// set folder to store images that are to be uploaded.
app.use("/images", express.static(path.join(__dirname, "images")));

/* 
-------------------------------
Set CORS Headers to Allow HTTP
-------------------------------
*/
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

/* 
-------------------------------
Routes Setup
-------------------------------
*/

// client routes
app.use("/client", ClientRoute);
app.use("/user", UserAuth);

// app.use("/maint", entityMaint);
// app.use("/search", userSearchRoute);

// app.use("/admin", admin);

/* 
-------------------------------
Production Setup
-------------------------------
*/

if (process.env.NODE_ENV === "production") {
  // Exprees will serve up production assets
  app.use(express.static("client/build"));

  // Express serve up index.html file if it doesn't recognize route
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

/* 
-------------------------------
Error Handling Middleware
-------------------------------
*/

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

/* 
------------------------------------------------------
App set to listen to port 3001 or ENV in Production
------------------------------------------------------
*/

app.listen(PORT, () => console.log(`Server is Listening on Port ${PORT}`));

/* 
-------------------------------------------------
Socket IO Setup Below To be used in app later.
-------------------------------------------------
*/

// const io = require("./socket").init(server);

// io.on("connection", socket => {
//   console.log("Client connected");
//   socket.on("room", data => {
//     console.log("GOT IT");
//     console.log("Greetings from RN app", data);
//   });
// });

// const io = socketIO(server);

// io.on('connection', (socket) => {
//   console.log('new user connected');

//   socket.on('disconnect', () => {
//       console.log('User was disconnected');
//   });

//   socket.on('room', (data) => {
//     console.log("GOT IT")
//     console.log('Greetings from RN app', data);
//   })
// });
