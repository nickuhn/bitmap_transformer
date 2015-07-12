var fs = require('fs');
var transform = require('./transform');
var os = require('os');

module.exports = function(fileDir, flag) {
  fs.readFile(__dirname + fileDir, function(err, data){

    if (err) {
      return err;
    }

    var buffer = data;

    var headerSize, count, offset;
    var pixelHolder = [];
    var pixel = [];
    var palette = false;

    var endianness = os.endianness();
    var type = buffer.toString('ascii', 0, 2);
    var fileName = fileDir.split('.b', 1)[0];

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
        for (var k = headerSize; k < offset; k ++) {
          count ++;
          if (count < 4) {
            pixelHolder.push(buffer.readUInt8(k));
          } else {
            pixel = transform[flag](pixelHolder, count);
            for (var l = 0; l < pixel.length; l++) {
             buffer.writeUInt8(pixel[l], k - (l + 1));
            }
            count = 0;
            pixelHolder = [];
          }
        }
      } else {
        for (var i = headerSize; i < offset; i ++) {
          count ++;
          if (count < 4) {
            buffer.writeUInt8(transform[flag](buffer.readUInt8(i), count), i);
          } else {
            count = 0;
          }
        }
      }
      fs.writeFile(__dirname + fileName + 'transformedwith' + flag + '.bmp', buffer);
      return ('ran paletted transform');
    }

    if (!palette) {
      if (flag.toLowerCase() === 'gy') {
        for (var n = headerSize; n < buffer.length; n ++) {
          count ++;
          if (count < 4) {
            pixelHolder.push(buffer.readUInt8(n));
          }
          if (count === 3) {
            pixel = transform[flag](pixelHolder, count);
            for (var m = 0; m < pixel.length; m++) {
              buffer.writeUInt8(pixel[m], n - m);
            }
            count = 0;
            pixelHolder = [];
          }
        }
      } else {
        for (var j = headerSize; j < buffer.length; j ++) {
          count ++;
          if (count < 4) {
            buffer.writeUInt8(transform[flag](buffer.readUInt8(j), (count)), j);
          }
          if (count === 3) {
            count = 0;
          }
        }
      }
      fs.writeFile(__dirname + fileName + 'transformedwith' + flag + '.bmp', buffer);
      return ('ran non-paletted transform');
    }
  });
};



