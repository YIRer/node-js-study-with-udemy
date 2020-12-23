const request = require("postman-request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiZXZhbnBhcmsiLCJhIjoiY2tpcmM5aW1hMDF2azJyb2F0YzI4MXk0aCJ9.-83KhgJ6AFlS_GsS05ozFA&limit=1&language=ko`;

  request({ url, json: true }, (err, res) => {
    if (err) {
      callback("Unable to connect to location services", undefined);
    } else if (res.body.features.length === 0) {
      callback("Unable to find location. Try another search", undefined);
    } else {
      const data = res.body.features[0];
      const [longitude, latitude] = data.center;
      const location = data.place_name;
      callback(undefined, { latitude, longitude, location });
    }
  });
};

module.exports = geocode;
