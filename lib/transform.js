
module.exports = function(data, flag, count) {
  var dataGray = [];
  switch (flag.toLowerCase()) {
    case 'i':
      return (255 - data);
      break;
    case 'gy':
      var sum = 0;
      var average = 0;
      for(var i = 0; i < data.length; i ++) {
        sum += data[i];
      }
      average = sum/data.length;
      pixel = [average, average, average];
      return pixel;
      break;
    case 'r':
      if (count === 3) {
      var dataRed = data * 3;
        if (dataRed > 255) {
          dataRed = 255;
        }
      } else {
        dataRed = data;
      }
      return dataRed;
      break;
    case 'g':
      if (count === 2) {
      var dataGreen = data * 3;
        if (dataGreen > 255) {
          dataGreen = 255;
        }
      } else {
        dataGreen = data;
      }
      return dataGreen;
      break;
    case 'b':
      if (count === 1) {
      var dataBlue = data * 3;
        if (dataBlue > 255) {
          dataBlue = 255;
        }
      } else {
        dataBlue = data;
      }
      return dataBlue;
      break;
    default:
      return data;
      break;
  }
};

