var crypto = require('crypto');


var input = 'cxdnnyjw';

var md5 = function(key) {
  return crypto.createHash('md5').update(key).digest('hex');
};

var isInteresting = function(hash) {
  return hash.slice(0, 5) === '00000';
};

var password = '';
var index = 0;
while(password.length < 8) {
  var hash = md5(input + index);
  if(isInteresting(hash)) {
    password = password.concat(hash.charAt(5));
    console.log(password);
  }
  index++;
}

var password2 = 'xxxxxxxx';
var numCharsFound = 0;
index = 0;
while(password2.includes('x')) {
  var hash = md5(input + index);
  var position = hash.charAt(5);
  if(isInteresting(hash) && position < password2.length && password2.charAt(position) === 'x') {
    position = Number(position);
    password2 = '' + password2.slice(0, position) + hash.charAt(6) + password2.slice(position + 1);
    console.log(password2);
  }
  index++;
}
