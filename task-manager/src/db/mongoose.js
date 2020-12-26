const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect("mongodb://127.0.0.1:27017/tast-manager-api", {
  useNewUrlParser: true,
  useCreateIndex: true,
});

// const User = mongoose.model("User", {
//   name: {
//     type: String,
//     trim: true,
//     required: true,
//   },
//   age: {
//     type: Number,
//     default: 0,
//     validate(value) {
//       if (value < 0) {
//         throw new Error("Age must be positive number");
//       }
//     },
//   },

//   password: {
//     type: String,
//     trim: true,
//     minLength: 7,
//     required: true,
//     validate(value) {
//       if (value.toLowerCase().includes("password")) {
//         throw new Error(`Password cannot cotain "password"`);
//       }
//     },
//   },

//   email: {
//     type: String,
//     required: true,
//     trim: true,
//     lowercase: true,
//     validate(value) {
//       if (!validator.isEmail(value)) {
//         throw new Error("Email is invalid");
//       }
//     },
//   },
// });

// const me = new User({
//   name: "Mike",
//   email: "asd@gmail.com",
//   password: "    5 sd  ",
// });

// me.save()
//   .then(() => {
//     console.log(me);
//   })
//   .catch((err) => console.log("Error!", err));

const Tasks = mongoose.model("Tasks", {
  description: {
    type: String,
    trim: true,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const task = new Tasks({ description: "Eat lunch" });

task
  .save()
  .then(() => {
    console.log(task);
  })
  .catch((err) => console.log("Error!", err));
