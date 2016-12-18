'use strict';

const result = require('fs').readFileSync('input.txt').toString()
  .split('\n')
  .map(item => item.trim())
  .map(item => item.split('  '))
  .map(item => item.map(number => parseInt(number, 10))
  .sort((b, a) => a < b))
  .reduce((prev, curr) => curr[0] + curr[1] > curr[2] ? prev + 1 : prev, 0);
console.log(result);
