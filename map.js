'use strict';
var turf = require('turf');

module.exports = function(tileLayers, tile, writeData, done) {
  var largest = {
    'length': 0,
    'feature': {}
  };
  var layer = tileLayers.osm.osm;
  var result = layer.features.filter(function(val) {
    if (val.properties.junction && val.properties.junction === 'roundabout') {
      var length = 0;
      try {
       length = turf.lineDistance(val, 'kilometers');
       val.properties.length = length;
       if (largest > largest.length) {
        largest.length = length;
        largest.feature = val;
       }
     } catch(e) {}
     return true;
   }
 });

  // write all roundabouts to stdout
  if (result.length > 0) {
    var fc = turf.featurecollection(result);
    writeData(JSON.stringify(fc) + '\n');
  }

  done(null, largest);
};