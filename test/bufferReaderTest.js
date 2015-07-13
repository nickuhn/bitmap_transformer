var BufferReader = require('../lib/bufferReader');
var expect = require('chai').expect;

var paletteBufferTest = [ 0, 0, 0, 0, 52, 32, 34, 0, 60, 40, 69, 0, 49, 57, 102, 0, 59, 86, 143, 0];
var inputFlag = 'i';
var inputDir = '/bitmaps/nonpalettebitmap.bmp';

describe('bufferReader', function(){
  before(function(){
    bufferObject = new BufferReader(inputDir, inputFlag, paletteBufferTest);
  });
  it('should store the input buffer under .buffer', function(){
    expect(bufferObject.buffer).to.deep.equal(paletteBufferTest);
  });
  it('should store the input flag under .flag', function(){
    expect(bufferObject.flag).to.deep.equal(inputFlag);
  });
  it('should check of endianness and store it in .endianness', function(){
    expect(bufferObject.endianness).to.deep.equal('LE');
  });
  it('should split off the ending .bmp and store the resulting directory string in .fileName', function(){
    expect(bufferObject.fileName).to.deep.equal('/bitmaps/nonpalettebitmap');
  });
});


