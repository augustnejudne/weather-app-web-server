const request = require('request');

const getGeoCode = (address, callback) => {
  const mapbox_accessToken = 'pk.eyJ1IjoiYXVndXN0bmVqdWRuZSIsImEiOiJjankxNml4aDUwYXJuM2pteDU4N2VmeDNuIn0.RDelID7nCOhCfcQ83bCZVQ';
  const mapbox_URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address,
  )}.json?access_token=${mapbox_accessToken}&limit=1&types=place`;

  request({ url: mapbox_URL, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to location services!', undefined);
      return;
    }
    if (response.body.features.length === 0) {
      callback(`Unable to locate address: ${address}. Try another search.`, undefined);
      return;
    }
    callback(undefined, {
      latitude: response.body.features[0].center[0],
      longitude: response.body.features[0].center[1],
      location: response.body.features[0].place_name,
    });

    return;
  });
};

module.exports = getGeoCode;
