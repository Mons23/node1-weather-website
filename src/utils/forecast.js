const request = require("request");
const forecast = (lat, long, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=6680b7e4bec81b102cf7a456098318d5&query=" +
    lat +
    "," +
    long;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather api!", undefined);
    } else if (body.error) {
      callback("Unable to find location!", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. And feels like ${body.current.feelslike} !`
      );
    }
  });
};

module.exports = forecast;
