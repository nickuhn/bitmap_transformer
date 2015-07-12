var fs = require('fs');
var transform = require('./transform');
var os = require('os');

module.exports = function(fileDir, flag, data) {

    var buffer = data;
    var headerSize, offset;
    var count = 0;
    var pixelHolder = [];
    var pixel = [];
    var palette = false;

    var endianness = os.endianness();
    var type = buffer.toString('ascii', 0, 2);
    var fileName = fileDir.split('.b', 1)[0];

    var paletteGrayscaler = function() {
      for (var k = headerSize; k < offset; k ++) {
        if (count <= 2) {
          count ++;
          pixelHolder.push(buffer.readUInt8(k));
        } else {
          pixel = transform.gy(pixelHolder, count);
          for (var l = 0; l < pixel.length; l++) {
           buffer.writeUInt8(pixel[l], k - (l + 1));
          }
          count = 0;
          pixelHolder = [];
        }
      }
    };

    var paletteTransformer = function() {
      for (var i = headerSize; i < offset; i ++) {
        if (count <= 2) {
          buffer.writeUInt8(transform[flag](buffer.readUInt8(i), count), i);
          count ++;
        } else {
          count = 0;
        }
      }
    };

    var nonPaletteGrayscaler = function() {
      for (var n = headerSize; n < buffer.length; n ++) {
        if (count <= 2) {
          pixelHolder.push(buffer.readUInt8(n));
          count ++;
        }
        if (count === 3) {
          pixel = transform.gy(pixelHolder, count);
          for (var m = 0; m < pixel.length; m++) {
            buffer.writeUInt8(pixel[m], n - m);
          }
          count = 0;
          pixelHolder = [];
        }
      }
    };

    var nonPaletteTransformer = function() {
      for (var j = headerSize; j < buffer.length; j ++) {
        if (count <= 2) {
          buffer.writeUInt8(transform[flag](buffer.readUInt8(j), (count)), j);
          count ++;
        }
        if (count === 3) {
          count = 0;
        }
      }
    };

    var writeBufferToFile = function() {
      fs.writeFile(__dirname + fileName + 'transformedwith' + flag + '.bmp', buffer, function(err){
        if (err) {
          return err;
        }
        return ('ran transform');
      });
    };

    if (type === 'BM') {
      if(endianness === 'LE') {
        offset = buffer.readUInt32LE(10);
      } else {
        offset = buffer.readUInt32BE(10);
      }
      headerSize = 54;
    } else {
      return 'Please use BM format bitmaps';
    }

    if (offset !== headerSize) {
      palette = true;
    }

    if (palette) {
      if (flag.toLowerCase() === 'gy') {
        paletteGrayscaler();
      } else {
        paletteTransformer();
      }
      writeBufferToFile();
    }

    if (!palette) {
      if (flag.toLowerCase() === 'gy') {
        nonPaletteGrayscaler();
      } else {
        nonPaletteTransformer();
      }
      writeBufferToFile();
    }
};



