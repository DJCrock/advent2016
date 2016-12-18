var fs = require('fs');

var initialRegex = /value (\d+) goes to bot (\d+)/;
var ruleRegex = /bot (\d+) gives low to (bot|output) (\d+) and high to (bot|output) (\d+)/;

var min = (a, b) => a < b ? a : b;
var max = (a, b) => a > b ? a : b;

var bots = [];
var outputs = [];
var state = {
  bot: bots,
  output: outputs
};

var parseInitialRule = (rule) => {
  var match = initialRegex.exec(rule);
  var value = Number(match[1]);
  var botNumber = match[2];
  bots[botNumber] = bots[botNumber] || {};
  bots[botNumber].values = bots[botNumber].values || [];
  bots[botNumber].values.push(value);
  bots[botNumber].number = botNumber;
};

var parseRule = (rule) => {
  var match = ruleRegex.exec(rule);
  var botNumber = match[1];
  bots[botNumber] = bots[botNumber] || {};
  bots[botNumber].values = bots[botNumber].values || [];
  bots[botNumber].lowType = match[2];
  bots[botNumber].lowNumber = match[3];
  bots[botNumber].highType = match[4];
  bots[botNumber].highNumber = match[5];
  bots[botNumber].number = match[1];
};

fs.readFile('./input.txt', 'utf8', function(err, data) {
  var rules = data.trim().split('\n');
  rules.filter(r => initialRegex.test(r)).forEach(parseInitialRule);
  rules.filter(rule => ruleRegex.test(rule)).forEach(parseRule);

  var hasTwoValues = bot => bot.values.length === 2;

  while(bots.some(hasTwoValues)) {
    bots.filter(hasTwoValues).forEach((bot) => {
      var low = bot.values.reduce(min);
      var high = bot.values.reduce(max);
      if(low == 17 && high == 61) {
        console.log('Part 1:', bot.number);
      }
      bot.values = [];
      state[bot.lowType][bot.lowNumber] = state[bot.lowType][bot.lowNumber] || {};
      state[bot.lowType][bot.lowNumber].values = state[bot.lowType][bot.lowNumber].values || [];
      state[bot.highType][bot.highNumber] = state[bot.highType][bot.highNumber] || {};
      state[bot.highType][bot.highNumber].values = state[bot.highType][bot.highNumber].values || [];
      state[bot.lowType][bot.lowNumber].values.push(low);
      state[bot.highType][bot.highNumber].values.push(high);
    });
  }
  console.log('Part 2:', outputs.slice(0, 3).reduce((a, b) => a * b.values[0], 1));
});
