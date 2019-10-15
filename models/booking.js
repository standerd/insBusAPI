const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookings = new Schema({
  userId: { type: String, require: true },
  propertyId: { type: String, require: true },
  street: { type: String, require: true },
  city: { type: String, require: true },
  country: { type: String, require: true },
  postal: { type: String, require: true },
  checkInDate: { type: String, require: true },
  checkOutDate: { type: String, require: true },
  guestCount: { type: String, require: true },
  totalBookingCost: { type: String, require: true },
  bookingDate: { type: Date, require: true }
});

module.exports = mongoose.model("Booking", bookings);
