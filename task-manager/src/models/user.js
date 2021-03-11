const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Task = require("./task");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
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

    age: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) {
          throw new Error("Age must be positive number");
        }
      },
    },

    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    avatar: { type: Buffer },
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("tasks", {
  ref: "Tasks",
  localField: "_id",
  foreignField: "owner",
});

userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id }, "secretKey");
  this.tokens = this.tokens.concat({ token });

  await this.save();
  return token;
};

userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;

  return userObject;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    console.log(this.password);
    this.password = await bcrypt.hash(this.password, 8);
  }

  next();
});

userSchema.pre("remove", async function (next) {
  await Task.deleteMany({ owner: this._id });
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
