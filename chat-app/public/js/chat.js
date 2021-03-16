//Elements
const $messageForm = document.getElementById("chat-form");
const $messageFormInput = document.getElementById("message-input");
const $messageFormSubmit = document.getElementById("chat-submit");
const $messages = document.getElementById("messages");

const messageTemplate = document.getElementById("message-template").innerHTML;
const locationmessageTemplate = document.getElementById(
  "location-message-template"
).innerHTML;

const $sidebar = document.getElementById("sidebar");
const sidebarTemplate = document.getElementById("sidebar-template").innerHTML;

const socket = io();

const autoScroll = () => {
  const $newMessage = $messages.lastElementChild;

  const newMessageStyles = getComputedStyle($newMessage);
  const newMessageMargin = parseInt(newMessageStyles.marginBottom);
  const newMessageHeight = $newMessage.offsetHeight + newMessageMargin;

  const visibleHeight = $messages.offsetHeight;
  const containerHeight = $messages.scrollHeight;
  const scrollOffset = $messages.scrollTop + visibleHeight;

  if (containerHeight - newMessageHeight <= scrollOffset) {
    $messages.scrollTop = $messages.scrollHeight;
  }
};

socket.on("message", ({ username, text, createdAt }) => {
  const html = Mustache.render(messageTemplate, {
    username,
    msg: text,
    createdAt: moment(createdAt).format("hh:mm a"),
  });

  $messages.insertAdjacentHTML("beforeend", html);
  autoScroll();
});

socket.on("locationMessage", ({ username, url, createdAt }) => {
  console.log(url);

  const html = Mustache.render(locationmessageTemplate, {
    username,
    url,
    createdAt: moment(createdAt).format("hh:mm a"),
  });

  $messages.insertAdjacentHTML("beforeend", html);
  autoScroll();
});

socket.on("roomData", ({ users, room }) => {
  const html = Mustache.render(sidebarTemplate, {
    room,
    users,
  });

  $sidebar.innerHTML = html;
});

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

socket.emit("join", { username, room }, (error) => {
  if (error) {
    alert(error);
    location.href = "/";
  }
});

$messageForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const message = e.target.elements.message;

  if (!message.value) {
    return;
  }
  $messageFormSubmit.setAttribute("disabled", true);

  socket.emit("sendMessage", message.value, (error) => {
    $messageFormSubmit.removeAttribute("disabled");
    $messageFormInput.focus();

    if (error) {
      return console.log(error);
    }
  });
  message.value = "";
});

const $locationBtn = document.getElementById("send-location");

$locationBtn.addEventListener("click", (e) => {
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by your browser.");
  }

  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);
    $locationBtn.setAttribute("disabled", true);
    socket.emit(
      "sendLocation",
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      () => {
        $locationBtn.removeAttribute("disabled");
        console.log("send location!");
      }
    );
  });
});
