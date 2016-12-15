var fs = require('fs');

var sum = (a, b) => a + b;

var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
var roomRegex = /((?:[a-z]+-)+[a-z]+)-([0-9]+)\[([a-z]+)\]/;

var countChars = function(acc, cha) {
  acc[cha] = acc[cha] ? acc[cha] + 1 : 1;
  return acc;
};

var generateChecksum = function(title) {
  var titleChars = title.replace(/-/g, '').split('');
  var charCount = titleChars.reduce(countChars, {});
  var chars = Object.keys(charCount);
  chars.sort(function(a, b) {
    if(charCount[a] === charCount[b]) {
      return a.localeCompare(b);
    } else {
      return charCount[b] - charCount[a];
    }
  });
  return chars.join('').slice(0, 5);
};

var parse = function(roomStr) {
  var match = roomRegex.exec(roomStr);
  return {
    title: match[1],
    sector: Number(match[2]),
    checksum: match[3],
    real: generateChecksum(match[1]) === match[3]
  };
};

var decrypt = function(room) {
  room.title = room.title.split('')
    .map(cha => {
      if(cha === '-') {
        return ' ';
      }
    return alphabet[(alphabet.indexOf(cha) + room.sector) % 26]
    })
    .join('');
  return room;
};

fs.readFile('./input.txt', 'utf8', function(err, data) {
  var rooms = data.trim().split('\n');

  rooms = rooms.map(parse).filter(room => room.real);
  console.log('Part 1: %d', rooms.map(room => room.sector).reduce(sum));

  rooms = rooms.map(decrypt).filter(room => room.title.includes('north'));
  console.log('Part 2:\n', rooms);
});
