var fs = require('fs');

var rectRegex = /^rect (\d+)x(\d)+$/;
var rowRegex = /rotate row y=(\d+) by (\d+)/;
var colRegex = /rotate column x=(\d+) by (\d+)/;

var display = [[], [], [], [], [], []];
for(var r = 0; r < 6; r++) {
  for(var c = 0; c < 50; c++) {
    display[r][c] = ' ';
  }
}

displayToString = (display) => {
  return display.map(row => row.join('')).join('\n');
};

var rect = (display, x, y) => {
  var newDisplay = [[], [], [], [], [], []];
  for(var r = 0; r < display.length; r++) {
    for(var c = 0; c < display[r].length; c++) {
      newDisplay[r][c] = c < x && r < y ? '#' : display[r][c];
    }
  }
  return newDisplay;
};

var rotateRow = (display, row, distance) => {
  var newDisplay = [[], [], [], [], [], []];
  for(var r = 0; r < display.length; r++) {
    for(var c = 0; c < display[r].length; c++) {
      var newCol = r === row ? (c + distance) % display[0].length : c;
      newDisplay[r][newCol] = display[r][c];
    }
  }
  return newDisplay;
};

var rotateCol = (display, col, distance) => {
  var newDisplay = [[], [], [], [], [], []];
  for(var r = 0; r < display.length; r++) {
    for(var c = 0; c < display[r].length; c++) {
      var newRow = c === col ? (r + distance) % display.length : r;
      newDisplay[newRow][c] = display[r][c];
    }
  }
  return newDisplay;
};

fs.readFile('./input.txt', 'utf8', function(err, data) {
  var instructions = data.trim().split('\n');
  instructions.forEach((instruction) => {
    var match = rectRegex.exec(instruction);
    if(match) {
      display = rect(display, Number(match[1]), Number(match[2]));
      return;
    }
    match = rowRegex.exec(instruction);
    if(match) {
      display = rotateRow(display, Number(match[1]), Number(match[2]));
      return;
    }
    match = colRegex.exec(instruction);
    if(match) {
      display = rotateCol(display, Number(match[1]), Number(match[2]));
      return;
    }
  });

  console.log('Part 1:');
  console.log(display.reduce((sum, row) => {
    return sum + row.reduce((sum, cha) => {
      return sum + (cha === '#');
    }, 0);
  }, 0));

  console.log('Part 2:');
  console.log(displayToString(display));
});
