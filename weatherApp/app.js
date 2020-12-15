const request = require("postman-request");

const url =
  "http://api.weatherstack.com/current?access_key=f3c1309b0e65420b814dc0f5afb27e69&query=37.8267,-122.4233";

request({ url, json: true }, (err, res) => {
  const data = res.body.current;
  console.log(
    `It is currently ${data.temperature} degrees out, It's feels like ${data.feelslike} degrees out`
  );
});
