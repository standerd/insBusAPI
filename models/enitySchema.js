const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
  userName: { type: String, require: true },
  password: { type: String, require: true },
  images: { type: Array },
  facilities: { type: Array },
  availability: { type: Array },
  offPeakRates: { type: String },
  peakRates: { type: String }
});

module.exports = mongoose.model("Entity", entityReg);
