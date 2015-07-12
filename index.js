var transform = require('./lib/transform');
var bufferReader = require('./lib/bufferReader');
var fs = require('fs');


bufferReader('/../bitmaps/nonpalettebitmap.bmp', 'b');

//todo add in check for BE versus LE, add in command line interface, rewrite/add tests
