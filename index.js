var transform = require('./lib/transform');
var bufferReader = require('./lib/bufferReader');
var fs = require('fs');
var os = require('os');

bufferReader(process.argv[2], process.argv[3]);

// bufferReader('/../bitmaps/nonpalettebitmap.bmp', 'b');
