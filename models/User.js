const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  desc: {
    type: String,
  },
  inCart: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
  },
  price: {
    type: String,
  },
  qty: {
    type: Number,
    default: 1,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
