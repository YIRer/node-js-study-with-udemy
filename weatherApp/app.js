const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const address = process.argv[2];

if (address) {
  geocode(address, (err, { latitude, longitude } = {}) => {
    if (err) {
      return console.log(err);
    }
    
    forecast(latitude, longitude, (err, data) => {
      console.log(data);
      console.log(err);
    });
  });
} else {
  console.log("Please provide an address");
}
