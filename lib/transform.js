  function Transforms(data, count) {
    this.data = data;
    this.count = count;
    this.dataGray = [];
  };

  Transforms.i = function(data) {
    return 255 - data;
  }

  Transforms.gy = function(data) {
    var sum = 0;
    var average = 0;
    for(var i = 0; i < data.length; i ++) {
      sum += data[i];
    }
    average = sum/data.length;
    pixel = [average, average, average];
    return pixel
  }

  Transforms.r = function(data, count) {
    if (count === 3) {
      var dataRed = data * 3;
        if (dataRed > 255) {
          dataRed = 255;
        }
      } else {
        dataRed = data;
      }
    return dataRed;
  }

  Transforms.g = function(data, count) {
    if (count === 2) {
      var dataGreen = data * 3;
      if (dataGreen > 255) {
        dataGreen = 255;
      }
    } else {
      dataGreen = data;
    }
    return dataGreen;
  }

  Transforms.b = function(data, count) {
    if (count === 1) {
      var dataBlue = data * 3;
      if (dataBlue > 255) {
        dataBlue = 255;
      }
    } else {
      dataBlue = data;
    }
    return dataBlue;
  }

module.exports = Transforms;
