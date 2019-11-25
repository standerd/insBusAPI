const express = require("express");
const mongoose = require("mongoose");
const KEYS = require("./config/keys");
const bodyParser = require("body-parser");
const multer = require("multer");
const PORT = process.env.PORT || 3001;
const userSearchRoute = require("./routes/userRoutes/userSearch");
const entityRegRoute = require("./routes/entityRoutes/entityReg");
const entityMaint = require("./routes/entityRoutes/entityMaint");
const userAuth = require("./routes/userRoutes/userAuth");
const admin = require("./routes/admin");
const path = require("path");

//intialise express app.
const app = express();

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
app.use("/entity", entityRegRoute);
app.use("/maint", entityMaint);
app.use("/search", userSearchRoute);
app.use("/user", userAuth);
app.use("/admin", admin);

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

// mongo db connection setup
mongoose.connect(
  KEYS.keys.mongoUri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("MongoDB Connected")
);

//app set to listen of port 3001 if ENV is not used
app.listen(PORT, () => console.log(`Server is Listening on Port ${PORT}`));
