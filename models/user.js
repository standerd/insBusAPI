const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// User Schema For Mongo DB
const user = new Schema({
  name: { type: String, require: true },
  surname: { type: String, require: true },
  telNo: { type: String, require: false },
  altNo: { type: String, require: false },
  email: { type: String, require: false },
  gmail: { type: String, required: false },
  password: { type: String, require: false },
  googleId: { type: String, require: false },
  facebookId: { type: String, require: false },
  fmail: { type: String, required: false }
});

module.exports = mongoose.model("User", user);
