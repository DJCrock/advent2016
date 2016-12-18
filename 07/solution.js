var fs = require('fs');

var abba = /(.)(?!\1)(.)\2\1/;

var isEvenFilter = (val, index) => index % 2 === 0;
var isOddFilter = (val, index) => index % 2 !== 0;

var validateTLS = function(addressParts) {
  var outsideParts = addressParts.filter(isEvenFilter);
  var insideParts = addressParts.filter(isOddFilter);
  return outsideParts.some(part => abba.test(part))
    && insideParts.every(part => !abba.test(part));
}

var validateSSL = function(addressParts) {
  var abas = [];
  var outsideParts = addressParts.filter(isEvenFilter);
  var insideParts = addressParts.filter(isOddFilter);
  outsideParts.forEach((part) => {
    part.split('').forEach((cha, index, chars) => {
      if(chars[index + 2] === cha && chars[index + 1] !== cha) {
        abas.push(chars[index + 1] + cha + chars[index + 1]);
      }
    });
  });
  return abas.some(aba => insideParts.some(part => part.includes(aba)));
};

fs.readFile('./input.txt', 'utf8', function(err, data) {
  var addresses = data.trim().split('\n').map(adr => adr.split(/[\[\]]/));

  var validTLS = addresses.filter(validateTLS);
  console.log('Part 1:', validTLS.length);

  var validSSL = addresses.filter(validateSSL);
  console.log('Part 2:', validSSL.length);
});
