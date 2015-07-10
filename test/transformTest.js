var transform = require('../lib/transform');
var expect = require('chai').expect;

describe('transform', function(){
  it('should invert the sequence when passed an i flag', function(){
    expect(transform(0, 'i')).to.deep.equal(255);
  });
});
