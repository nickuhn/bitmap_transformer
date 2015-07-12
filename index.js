var fs           = require('fs');
var BufferReader = require('./lib/bufferReader');


fs.readFile(__dirname + process.argv[2], function(err, data){
  if (err) {
    return err;
  }

  var currentBuffer = new BufferReader('/..' + process.argv[2], process.argv[3], data);

  if (currentBuffer.type === 'BM') {
    if(currentBuffer.endianness === 'LE') {
      currentBuffer.offset = currentBuffer.buffer.readUInt32LE(10);
    } else {
      currentBuffer.offset = currentBuffer.buffer.readUInt32BE(10);
    }
    currentBuffer.headerSize = 54;
  } else {
    return 'Please use BM format bitmaps';
  }

  if (currentBuffer.offset !== currentBuffer.headerSize) {
    currentBuffer.palette = true;
  }

  if (currentBuffer.palette) {
    if (currentBuffer.flag.toLowerCase() === 'gy') {
      currentBuffer.paletteGrayscaler();
    } else {
      currentBuffer.paletteTransformer();
    }
    currentBuffer.writeBufferToFile();
  }

  if (!currentBuffer.palette) {
    if (currentBuffer.flag.toLowerCase() === 'gy') {
      currentBuffer.nonPaletteGrayscaler();
    } else {
      currentBuffer.nonPaletteTransformer();
    }
    currentBuffer.writeBufferToFile();
  }
});
