const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({
  name: { type: String, require: true },
  surname: { type: String, require: true },
  telNo: { type: String, require: true },
  altNo: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true }
});

module.exports = mongoose.model("User", user);
