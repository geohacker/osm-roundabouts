'use strict';
var tileReduce = require('tile-reduce');
var path = require('path');
var argv = require('minimist')(process.argv.slice(2));
var mbtilesPath = argv.mbtiles;
var largest = {
  'length': 0,
  'feature': {}
};

tileReduce({
  zoom: 12,
  map: path.join(__dirname, '/map.js'),
  sources: [{
    name: 'osm',
    mbtiles: mbtilesPath,
    raw: false
  }]
})
.on('reduce', function(feature) {
  if (feature.length > largest.length) {
    largest.length = feature.length;
    largest.feature = feature.feature;
  }
})
.on('end', function() {

  // write the largest roundabout to stderr
  process.stderr.write(JSON.stringify(largest));
});