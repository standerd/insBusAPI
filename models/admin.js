const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Asmin Schema For Mongo DB

const admin = new Schema({
  name: { type: String, require: true },
  password: { type: String, require: true }
});

module.exports = mongoose.model("Admin", admin);
