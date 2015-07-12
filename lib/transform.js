  function Transforms(data, count) {
    this.data = data;
    this.count = count;
  }

  Transforms.i = function(data) {
    return 255 - data;
  };

  Transforms.gy = function(data) {
    var sum = 0;
    var average = 0;
    for(var i = 0; i < data.length; i ++) {
      sum += data[i];
    }
    average = sum/data.length;
    var pixel = [average, average, average];
    return pixel;
  };

  Transforms.r = function(data, count) {
    var dataRed;
    if (count === 2) {
      dataRed = data * 3;
      if (dataRed > 255) {
        dataRed = 255;
      }
    } else {
      dataRed = data;
    }
    return dataRed;
  };

  Transforms.g = function(data, count) {
    var dataGreen;
    if (count === 1) {
      dataGreen = data * 3;
      if (dataGreen > 255) {
        dataGreen = 255;
      }
    } else {
      dataGreen = data;
    }
    return dataGreen;
  };

  Transforms.b = function(data, count) {
    var dataBlue;
    if (count === 0) {
      dataBlue = data * 3;
      if (dataBlue > 255) {
        dataBlue = 255;
      }
    } else {
      dataBlue = data;
    }
    return dataBlue;
  };

  Transforms.rd = function() {
    return Math.floor(Math.random()*256);
  };

module.exports = Transforms;
