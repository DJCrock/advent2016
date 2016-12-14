var fs = require('fs');

var directions = {
  N: {
    L: 'W',
    R: 'E',
    axis: 'y',
    dist: 1
  },
  E: {
    L: 'N',
    R: 'S',
    axis: 'x',
    dist: 1
  },
  S: {
    L: 'E',
    R: 'W',
    axis: 'y',
    dist: -1
  },
  W: {
    L: 'S',
    R: 'N',
    axis: 'x',
    dist: -1
  }
}

var state = {
  direction: directions.N,
  x: 0,
  y: 0
}

var visited = { '0': {'0': true}};
var found = false;

fs.readFile('./input.txt', 'utf8', function(err, data) {
  var steps = data.trim().split(', ').map(function(step) {
    return {
      direction: step.substring(0, 1),
      distance:  parseInt(step.substring(1))
    };
  });
  steps.forEach(function(step) {
    state.direction = directions[state.direction[step.direction]];
    while(step.distance !== 0) {
      state[state.direction.axis] += state.direction.dist;
      step.distance--;
      if(!found) {
        visited[state.x] = visited[state.x] || {};
        if(visited[state.x][state.y]) {
          found = true;
          console.log(state);
          console.log(Math.abs(state.x) + Math.abs(state.y));
        } else {
          visited[state.x][state.y] = true;
        }
      }
    }
  });
  console.log(state);
  console.log(Math.abs(state.x) + Math.abs(state.y));
});
