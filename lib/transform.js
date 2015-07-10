
module.exports = function(data, flag, count) {
  switch (flag.toLowerCase()) {
    case 'i':
      return (255 - data);
      break;
    case 'gy':
      var dataGray = data * 3;
      if (dataGray > 255) {
        dataGray = 255;
      }
      return dataGray;
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

