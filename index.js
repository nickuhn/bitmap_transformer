var transform = require('./lib/transform');
var bufferReader = require('./lib/bufferReader');

bufferReader('/../bitmaps/nonpalettebitmap.bmp', 'gy');

//todo add in check for BE versus LE, add in command line interface, rewrite/add tests
