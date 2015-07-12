module.exports = function(fileDir, flag) {
  var fs = require('fs');
  var transform = require('./transform');

  var headerSize = 0;
  var palette = false;
  var pixelHolder = [];
  var count = 0;

  var buffer = fs.readFileSync(__dirname + fileDir);
  var type = buffer.toString('ascii', 0, 2);
  var offset = buffer.readUInt32LE(10);
  var fileName = fileDir.split('.b', 1)[0];

  if (type === 'BM') {
    headerSize = 54;
  }

  if (offset !== headerSize) {
    palette = true;
  }

  if (palette) {
    if (flag.toLowerCase() === 'gy') {
      for (var k = headerSize; k < offset; k ++) {
        count ++
        if (count < 4) {
          pixelHolder.push(buffer.readUInt8(k));
        } else {
          var pixel = transform[flag](pixelHolder, count);
          for (var l = 0; l < pixel.length; l++) {
           buffer.writeUInt8(pixel[l], k - (l + 1));
          };
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
    fs.writeFile(__dirname + fileName + 'transformed.bmp', buffer);
    return ('ran paletted transform');
  }

  if (!palette) {
    if (flag.toLowerCase() === 'gy') {
      for (var n = headerSize; n < buffer.length; n ++) {
        count ++
        if (count < 4) {
          pixelHolder.push(buffer.readUInt8(n));
        }
        if (count === 3) {
          var pixel = transform[flag](pixelHolder, count);
          for (var m = 0; m < pixel.length; m++) {
            buffer.writeUInt8(pixel[m], n - m);
          };
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
    fs.writeFile(__dirname + fileName + 'transformed2.bmp', buffer);
    return ('ran non-paletted transform');
  }
};



