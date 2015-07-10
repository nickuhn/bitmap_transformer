var transform = require('../lib/transform');
var expect = require('chai').expect;


describe('transform', function(){
  it('should invert the sequence when passed an i flag', function(){
    var color = [0, 0, 0, 0];
    expect(transform(color[0], 'i', 0)).to.deep.equal(255);
  });
  it('should greyscale the sequence when passed an gy flag', function(){
    var color = [100, 0, 0, 0];
    expect(transform(color[0], 'gy', 0)).to.deep.equal(255);
  });
  it('should blue scale the sequence when passed a b flag', function(){
    var color = [0, 100, 0, 0];
    expect(transform(color[1], 'b', 1)).to.deep.equal(255);
  });
  it('should green scale the sequence when passed a g flag', function(){
    var color = [0, 0, 100, 0];
    expect(transform(color[2], 'g', 2)).to.deep.equal(255);
  });
  it('should red scale the sequence when passed a r flag', function(){
    var color = [0, 0, 0, 100];
    expect(transform(color[3], 'r', 3)).to.deep.equal(255);
  });
});
