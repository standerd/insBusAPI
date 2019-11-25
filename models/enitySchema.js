const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Entity/property Schema for Mongo DB

const entityReg = new Schema({
  name: { type: String, require: true },
  entityType: { type: String, require: true },
  street: { type: String, require: true },
  suburb: { type: String, required: true },
  city: { type: String, require: true },
  country: { type: String, require: true },
  postalCode: { type: String, require: true },
  long: { type: String },
  lat: { type: String },
  telNo: { type: String, require: true },
  altNo: { type: String, require: true },
  email: { type: String, require: true },
  images: { type: Array },
  facilities: { type: Array },
  availability: { type: Array },
  rates: { type: String, require: true },
  description: { type: String, require: true },
  userId: { type: String, require: true }
});

module.exports = mongoose.model("Entity", entityReg);
