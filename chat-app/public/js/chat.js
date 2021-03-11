const socket = io();

socket.on("message", (msg) => {
  const msgArea = document.getElementById("message-area");
  const newMsg = document.createElement("span");
  newMsg.innerText = msg;
  msgArea.appendChild(newMsg);
});

document.getElementById("chat-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const message = e.target.elements.message;

  if (!message.value) {
    return;
  }
  socket.emit("sendMessage", message.value);
  message.value = "";
});

document.getElementById("send-location").addEventListener("click", (e) => {
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by your browser.");
  }

  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);
    socket.emit("sendLocation", {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  });
});
