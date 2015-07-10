module.exports = function(fileDir, flag) {
  var fs = require('fs');
  var transform = require('./transform');

  var headerSize = 0;
  var palette = false;

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
    var count = 0;
    for (var i = headerSize; i < offset; i ++) {
      count ++;
      if (count < 4) {
        buffer.writeUInt8(transform(buffer.readUInt8(i), flag, count), i);
      } else {
        count = 0;
      }
    }
    fs.writeFile(__dirname + fileName + 'transformed.bmp', buffer);
    return ('ran paletted transform');
  }

  if (!palette) {
    var count = 0;
    for (var j = headerSize; j < buffer.length; j ++) {
      count ++;
      if (count < 3) {
        buffer.writeUInt8(transform(buffer.readUInt8(j), flag, (count)), j);
      } else {
        buffer.writeUInt8(transform(buffer.readUInt8(j), flag, (count)), j);
        count = 0;
      }
    }
    fs.writeFile(__dirname + fileName + 'transformed.bmp', buffer);
    return ('ran non-paletted transform');
  }
};



