const http = require("http");
const url = `http://api.weatherstack.com/current?access_key=f3c1309b0e65420b814dc0f5afb27e69&query=40,-75`;

const request = http.request(url, (res) => {
  let data = "";

  res.on("data", (chunk) => {
    data = data + chunk.toString();
  });

  res.on("end", () => {
    const body = JSON.parse(data);
    console.log(body);
  });
});

request.on("error", (error) => {
  console.log("An error", error);
});

request.end();
