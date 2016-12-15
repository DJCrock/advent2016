var fs = require('fs');

var sum = (a, b) => a + b;

var isValid = function(sides) {
  return    (sides[0] + sides[1] > sides[2])
         && (sides[0] + sides[2] > sides[1])
         && (sides[1] + sides[2] > sides[0]);
};

fs.readFile('./input.txt', 'utf8', function(err, data) {
  var triangles = data.trim().split('\n').map(function(str) {
    return str.trim().split(/\s+/).map(Number);
  });

  var vertTriangles = [];
  for(var i = 0; i < triangles.length; i += 3) {
    for(var k = 0; k < 3; k++) {
      var triangle = [triangles[i][k], triangles[i+1][k], triangles[i+2][k]];
      vertTriangles.push(triangle);
    }
  }

  console.log('Part 1: %d', triangles.map(isValid).reduce(sum));
  console.log('Part 2: %d', vertTriangles.map(isValid).reduce(sum));
});
