const mongoose = require("mongoose");
const validator = require("validator");

const User = mongoose.model("User", {
  name: {
    type: String,
    trim: true,
    required: true,
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be positive number");
      }
    },
  },

  password: {
    type: String,
    trim: true,
    minLength: 7,
    required: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error(`Password cannot cotain "password"`);
      }
    },
  },

  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
});

module.exports = User;
