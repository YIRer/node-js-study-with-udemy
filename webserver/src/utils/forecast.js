const request = require("postman-request");

const forecast = (lan, lon, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=f3c1309b0e65420b814dc0f5afb27e69&query=${lan},${lon}`;
  request({ url, json: true }, (err, res) => {
    if (err) {
      callback("Unable to connect to location services", undefined);
    } else if (res.body.error) {
      callback("Unable to find location. Try another search", undefined);
    } else {
      console.log(res.body.current);
      const { temperature, feelslike, weather_descriptions } = res.body.current;
      callback(undefined, { temperature, feelslike, weather_descriptions });
    }
  });
};

module.exports = forecast;
