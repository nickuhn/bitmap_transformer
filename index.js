var transform = require('./lib/transform');
var bufferReader = require('./lib/bufferReader');
var fs = require('fs');
var os = require('os');


fs.readFile(__dirname + process.argv[2], function(err, data){
  if (err) {
    return err;
  }
  bufferReader('/..' + process.argv[2], process.argv[3], data);
});

// bufferReader('/../bitmaps/nonpalettebitmap.bmp', 'b');
