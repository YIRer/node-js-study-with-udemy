const express = require("express");
const path = require("path");
const http = require("http");
const BadWords = require("bad-words");
const {
  generateMessage,
  generateLocationMessage,
} = require("./utils/messages.js");

const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("./utils/users.js");

const socketio = require("socket.io");

const app = express();
const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");

const server = http.createServer(app);

const io = socketio(server);

app.use(express.static(publicDirectoryPath));

io.on("connection", (socket) => {
  console.log("new connection");

  socket.on("sendMessage", (msg, callback) => {
    const filter = new BadWords();

    if (filter.isProfane(msg)) {
      return callback("Profanity is not allowed!");
    }
    const user = getUser(socket.id);
    io.to(user.room).emit("message", generateMessage(user.username, msg));
    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit(
        "message",
        generateMessage("System", `${user.username} has left!!`)
      );

      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });

  socket.on("sendLocation", (coords, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit(
      "locationMessage",
      generateLocationMessage(
        user.username,
        `https://google.co.kr/maps?q=${coords.latitude},${coords.longitude}`
      )
    );

    callback();
  });

  socket.on("join", (options, callback) => {
    const { error, user } = addUser({ id: socket.id, ...options });

    if (error) {
      return callback(error);
    }

    const { username, room } = user;

    socket.join(room);

    socket.emit("message", generateMessage("System", "Welcome!"));
    socket.broadcast
      .to(room)
      .emit("message", generateMessage("System", `${username} has joined!!`));

    io.to(room).emit("roomData", {
      room,
      users: getUsersInRoom(room),
    });
    callback();
  });
});

server.listen(port, () => {
  console.log("port 3000");
});
