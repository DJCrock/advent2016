var fs = require('fs');

var tag = /^(.*?)\((\d+)x(\d+)\)(.*)$/

function decompress(data, countOnly, recursive) {
  var decompressed = '';
  var count = 0;

  while(data) {
    var match = tag.exec(data);
    if(!match) {
      decompressed += data;
      count += data.length;
      data = '';
      break;
    }
    var numChars = Number(match[2]);
    var repetitions = Number(match[3]);
    var target = match[4].slice(0, numChars);
    if(recursive) {
      target = decompress(target, countOnly, true);
    }
    if(countOnly) {
      target = target.length || target;
      count += match[1].length;
      count += target * repetitions
    } else {
      decompressed += match[1];
      decompressed += target.repeat(repetitions);
    }
    data = match[4].slice(numChars);
  }
  return countOnly ? count : decompressed;
};

fs.readFile('./input.txt', 'utf8', function(err, data) {
  data = data.trim();

  var decompressed = decompress(data, true);
  console.log('Part 1:', decompressed);

  var decompressedRecursive = decompress(data, true, true);
  console.log('Part 2:', decompressedRecursive);
});
