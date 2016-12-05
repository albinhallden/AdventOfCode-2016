'use strict';

const fs = require('fs');
const path = require('path');

const result = fs.readFileSync(path.join('input.txt')).toString()
  .split('\n')
  .map(item => item.trim())
  .map(item => item.split('  '))
  .map(item => item.map(number => parseInt(number, 10))
  .sort((b, a) => a < b))
  .reduce((prev, curr) => {
    if (curr[0] + curr[1] > curr[2]) prev++;
    return prev;
  }, 0);
console.log(result);