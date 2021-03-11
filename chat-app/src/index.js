const express = require("express");
const path = require("path");
const http = require("http");

const socketio = require("socket.io");

const app = express();
const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");

const server = http.createServer(app);

const io = socketio(server);

app.use(express.static(publicDirectoryPath));

io.on("connection", (socket) => {
  console.log("new connection");

  socket.emit("message", "Welcome");
  socket.broadcast.emit("message", "A new user has joined!!");

  socket.on("sendMessage", (msg) => {
    console.log(msg);
    io.emit("message", msg);
  });

  socket.on("disconnect", () => {
    io.emit("message", "A user has left!!");
  });

  socket.on("sendLocation", (coords) => {
    io.emit("message", `https://google.co.kr/maps?q=${coords.latitude},${coords.longitude}`);
  });
});

server.listen(port, () => {
  console.log("port 3000");
});
