var fs        = require('fs');
var os        = require('os');
var transform = require('./transform');

function BufferReader(fileDir, flag, data) {
  this.buffer      = data,
  this.headerSize  = 0,
  this.offset      = 0,
  this.count       = 0,
  this.pixelHolder = [],
  this.pixel       = [],
  this.palette     = false,
  this.endianness  = os.endianness();
  this.type        = data.toString('ascii', 0, 2);
  this.fileName    = fileDir.split('.b', 1)[0];
  this.flag        = flag;
}

BufferReader.prototype.paletteGrayscaler = function() {
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

BufferReader.prototype.paletteTransformer = function() {
  for (var i = this.headerSize; i < this.offset; i ++) {
    if (this.count <= 2) {
      this.buffer.writeUInt8(transform[this.flag](this.buffer.readUInt8(i), this.count), i);
      this.count ++;
    } else {
      this.count = 0;
    }
  }
};

BufferReader.prototype.nonPaletteGrayscaler = function() {
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

BufferReader.prototype.nonPaletteTransformer = function() {
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

BufferReader.prototype.writeBufferToFile = function() {
  fs.writeFile(__dirname + this.fileName + 'transformedwith' + this.flag + '.bmp', this.buffer, function(err){
    if (err) {
      return err;
    }
    return ('wrote file to: '+ __dirname + this.fileName + 'transformedwith' + this.flag + '.bmp');
  });
};

module.exports = BufferReader;



