const express = require("express");
const mongoose = require("mongoose");
const KEYS = require("./config/keys");
const bodyParser = require("body-parser");
const multer = require("multer");
const PORT = process.env.PORT || 3001;
const userSearchRoute = require("./routes/userRoutes/userSearch");
const entityRegRoute = require("./routes/entityRoutes/entityReg");
const userAccount = require("./routes/userRoutes/userAccount");
const path = require("path");

const app = express();

app.use(bodyParser.json());

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  }
});

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

app.use(bodyParser.json());
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/entity", entityRegRoute);
app.use("/search", userSearchRoute);
app.use("/user", userAccount);

mongoose.connect(
  KEYS.keys.mongoUri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("MongoDB Connected")
);

app.listen(PORT, () => console.log(`Server is Listening on Port ${PORT}`));
