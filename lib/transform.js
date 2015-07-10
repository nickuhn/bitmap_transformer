
module.exports = function(data, flag) {
  switch (flag.toLowerCase()) {
    case 'i':
      return (255 - data);
  }
};

