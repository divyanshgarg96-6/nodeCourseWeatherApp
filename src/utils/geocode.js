const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiZGlpdnl1IiwiYSI6ImNsbDUyZmZ2ajBicW4zamtkcm1pMng0ajgifQ.bEdCnW54I_NJgqm88Q1p_Q&limit=1`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find the location!", undefined);
    } else {
      let { center, place_name: location } = body.features[0];
      callback(undefined, {
        latitude: center[1],
        longitude: center[0],
        location,
      });
    }
  });
};

module.exports = geocode;
