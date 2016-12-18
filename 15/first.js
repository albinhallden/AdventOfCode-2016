'use strict';

const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join('input.txt')).toString()
  .split('\n').map(item => item.trim())
  .map(item => item.split(' '))
  .map((item, index) => {
    return {
      length: parseInt(item[3], 10),
      position: parseInt(item[11], 10)
    }
  });

let time = 0;
do {
  const test = data.map((item, index) => {
    return (item.position + time + index + 2) % item.length;
  }).reduce((prev, curr) => prev + curr, 0);

  if (test === 0) break;
  time++;
} while (true)

console.log(time + 1);