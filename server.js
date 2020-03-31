const express = require("express");
const db = require("./models");
const KEYS = require("./config/keys");
const bodyParser = require("body-parser");
const multer = require("multer");
const PORT = process.env.PORT || 3001;
const userSearchRoute = require("./routes/userRoutes/userSearch");
const ClientRoute = require("./routes/ClientRoute/ClientReg");
const entityMaint = require("./routes/ClientRoute/entityMaint");
const userAuth = require("./routes/userRoutes/userAuth");
const admin = require("./routes/admin");
const path = require("path");
const socketIO = require("socket.io");

//intialise express app.
const app = express();

//initialise postgres sequel database.
db.sequelize.sync({ force: true }).then(() => console.log("Drop and Sync"));

//setup body parser
app.use(bodyParser.json());

// Setup Multer and file access and storage handler for images upload and access
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

app.use("/images", express.static(path.join(__dirname, "images")));

// set headers to ensure CORRS requests can pass.
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Routes setup
app.use("/client", ClientRoute);
// app.use("/maint", entityMaint);
// app.use("/search", userSearchRoute);
// app.use("/user", userAuth);
// app.use("/admin", admin);

//production setup
if (process.env.NODE_ENV === "production") {
  // Exprees will serve up production assets
  app.use(express.static("client/build"));

  // Express serve up index.html file if it doesn't recognize route
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//error handler middleware setup.
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

//app set to listen of port 3001 if ENV is not used
app.listen(PORT, () => console.log(`Server is Listening on Port ${PORT}`));

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
