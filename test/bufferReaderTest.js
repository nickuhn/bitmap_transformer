var bufferReader = require('../lib/bufferReader');
var expect = require('chai').expect;

// paletteBufferTest = [ 0, 0, 0, 0, 52, 32, 34, 0, 60, 40, 69, 0, 49, 57, 102, 0, 59, 86, 143, 0];

describe('bufferReader', function(){
  it('should not return errors after running a transform correctly', function(){
    expect(bufferReader('/../bitmaps/palettebitmap.bmp', 'i')).to.not.equal('err');
  });
  it('should return "ran a BM" when passed proper file format', function(){
    expect(bufferReader('/../bitmaps/palettebitmap.bmp', 'i')).to.deep.equal('ran a BM');
  });
});
