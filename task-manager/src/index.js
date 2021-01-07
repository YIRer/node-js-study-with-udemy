const express = require("express");
require("./db/mongoose");

const jwt = require("jsonwebtoken");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/tasks");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is up on port" + port);
});

// const Task = require("./models/task");
// const User = require("./models/user");

// const main = async () => {
//   try {
//     const user = await User.findById("5ff70c0b790eb519647077ad");
//     await user.populate("tasks").execPopulate();
//     console.log(user.tasks);
//   } catch (e) {
//     console.log(e);
//   }
// };

// main();
