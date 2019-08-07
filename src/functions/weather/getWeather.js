const getGeoCode = require('./getGeoCode.js');
const getDarksky = require('./getDarksky.js');

const getWeather = (address, callback) => {
  if (!address) {
    callback('No address provided', undefined);
    return;
  }
  getGeoCode(address, (error, geoCodeData) => {
    if (error) {
      callback(error, undefined);
      return;
    }
    getDarksky(geoCodeData, (error, { summary, temperature, precipProbability, location, response }) => {
      if (error) {
        callback(error, undefined);
        return;
      }
      callback(undefined, { summary, temperature, precipProbability, location, response });
      return;
    });
  });
};

module.exports = getWeather;
