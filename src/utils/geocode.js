const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoibW9ucy0xMSIsImEiOiJja3MyNnQxdjEyMHl0Mndwc3M1Y2lnYnRuIn0.XgT9xcsGz07mkjPPy_3FaA";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to geolocation api!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location!", undefined);
    } else {
      callback(undefined, {
        Longitude: body.features[0].center[0],
        Latitude: body.features[0].center[1],
        Location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
