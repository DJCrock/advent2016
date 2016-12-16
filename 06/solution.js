var fs = require('fs');

var countChars = function(counter, message) {
  message.split('').forEach(function(cha, index) {
    counter[index] = counter[index] || {};
    counter[index][cha] = (counter[index][cha] || 0) + 1;
  })
  return counter;
};

var getMaxChar = function(counts) {
  return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b)
};

var getMinChar = function(counts) {
  return Object.keys(counts).reduce((a, b) => counts[a] < counts[b] ? a : b)
};

fs.readFile('./input.txt', 'utf8', function(err, data) {
  var messages = data.trim().split('\n');
  var charCounts = messages.reduce(countChars, []);

  console.log('Part 1:', charCounts.map(getMaxChar).join(''));
  console.log('Part 2:', charCounts.map(getMinChar).join(''));
});

