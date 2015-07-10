var bufferReader = require('../lib/bufferReader');
var expect = require('chai').expect;

describe('bufferReader', function(){
  it('should detemine whether the file is paletted or not', function(){
    expect(bufferReader()).to.deep.equal('ran paletted transform');
  });
});
