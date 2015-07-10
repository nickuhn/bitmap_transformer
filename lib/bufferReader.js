var fs = require('fs');
var transform = require('./transform');

var buffer = fs.readFileSync(__dirname + '/../bitmaps/palettebitmap.bmp');

var headerSize = 0;
var palette = false;
var type = buffer.toString('ascii', 0, 2);
if (type === 'BM') {
  headerSize = 54
}
var offset = buffer.readUInt32LE(10);
var numColors = buffer.readUInt32LE(46); //pulls out number of colors
if (offset !== headerSize) {
  palette = true;
};

if (palette) {
  for (var i = headerSize; i < offset; i ++) {
    buffer.writeUInt8(transform(buffer.readUInt8(i), 'i'), i);
  }
  fs.writeFile(__dirname + '/../bitmaps/palettebitmaptransformed.bmp', buffer);
  return ('ran paletted transform');
};



