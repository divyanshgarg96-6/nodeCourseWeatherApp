const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=14b2cb71124773c076f7b07a58ac10dc&query=${latitude},${longitude}&units=m`;

  request({ url, json: true }, (error, {body}={}) => {
    console.log(body)
    if (error) {
      callback("Unable to connect to forecast services!", undefined);
    } else if (body && body.error) {
      callback("Unable to find location!", undefined);
    } else {
      console.log(body.current)
      let { weather_descriptions, temperature, feelslike,humidity } =
        body.current;
      callback(
        undefined,
        `${weather_descriptions[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out. The humidity is ${humidity}%.`
      );
    }
  });
};

module.exports = forecast;
