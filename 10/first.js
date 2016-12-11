'use strict';

const fs = require('fs');
const path = require('path');

const bots = new Set();
const fullBots = [];
const botsCodes = {};

function addBotValue(bot, value) {
  if (bots[bot] === undefined) bots[bot] = [];
  bots[bot].push(value); 
  if (bots[bot].length === 2) fullBots.push(bot);
}

const data = fs.readFileSync(path.join('input.txt')).toString()
  .split('\n').map(item => item.trim())
  .reduce((prev, curr) => {
    const values = curr.split(' ');
    values[0] === 'bot'
      ? botsCodes[values[0] + values[1]] = { low: values[5] + values[6], high: values[10] + values[11] }
      : addBotValue(values[4] + values[5], parseInt(values[1], 10));
    return prev;
  }, { values: [], moves: [] });

while (fullBots.length > 0) {
  const bot = fullBots.pop();
  const low = Math.min(bots[bot][0], bots[bot][1]);
  const high = Math.max(bots[bot][0], bots[bot][1]);
  if (low === 17 && high === 61) {
    console.log(bot, low, high);
    break;
  }
  addBotValue(botsCodes[bot].low, low);
  addBotValue(botsCodes[bot].high, high);
  bots[bot] = [];
}