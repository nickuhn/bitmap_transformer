var fs = require('fs');
var transform = require('./transform');
var os = require('os');

    function BufferInfo(fileDir, flag, data) {
      this.buffer = data,
      this.headerSize = 0,
      this.offset = 0,
      this.count = 0,
      this.pixelHolder = [],
      this.pixel = [],
      this.palette = false,
      this.endianness = os.endianness();
      this.type = data.toString('ascii', 0, 2);
      this.fileName = fileDir.split('.b', 1)[0];
      this.flag = flag;
    };

    BufferInfo.prototype.paletteGrayscaler = function() {
      for (var k = this.headerSize; k < this.offset; k ++) {
        if (this.count <= 2) {
          this.count ++;
          this.pixelHolder.push(this.buffer.readUInt8(k));
        } else {
          this.pixel = transform.gy(this.pixelHolder, this.count);
          for (var l = 0; l < this.pixel.length; l++) {
           this.buffer.writeUInt8(this.pixel[l], k - (l + 1));
          }
          this.count = 0;
          this.pixelHolder = [];
        }
      }
    };

    BufferInfo.prototype.writeBufferToFile = function() {
      fs.writeFile(__dirname + this.fileName + 'transformedwith' + this.flag + '.bmp', this.buffer, function(err){
        if (err) {
          return err;
        }
        return ('ran transform');
      });
    };


    BufferInfo.prototype.paletteTransformer = function() {
      for (var i = this.headerSize; i < this.offset; i ++) {
        if (this.count <= 2) {
          this.buffer.writeUInt8(transform[this.flag](this.buffer.readUInt8(i), this.count), i);
          this.count ++;
        } else {
          this.count = 0;
        }
      }
    };

    BufferInfo.prototype.nonPaletteGrayscaler = function() {
      for (var n = this.headerSize; n < this.buffer.length; n ++) {
        if (this.count <= 2) {
          this.pixelHolder.push(this.buffer.readUInt8(n));
          this.count ++;
        }
        if (this.count === 3) {
          this.pixel = transform.gy(this.pixelHolder, this.count);
          for (var m = 0; m < this.pixel.length; m++) {
            this.buffer.writeUInt8(this.pixel[m], n - m);
          }
          this.count = 0;
          this.pixelHolder = [];
        }
      }
    };

    BufferInfo.prototype.nonPaletteTransformer = function() {
      for (var j = this.headerSize; j < this.buffer.length; j ++) {
        if (this.count <= 2) {
          this.buffer.writeUInt8(transform[this.flag](this.buffer.readUInt8(j), (this.count)), j);
          this.count ++;
        }
        if (this.count === 3) {
          this.count = 0;
        }
      }
    };

module.exports = function(fileDir, flag, data) {
  var currentBuffer = new BufferInfo(fileDir, flag, data);

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
};



