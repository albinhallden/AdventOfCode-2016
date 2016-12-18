'use strict';

const grid = [
  [false, false, 1, false, false],
  [false, 2, 3, 4, false],
  [5,6,7,8,9],
  [false, 'A', 'B', 'C', false],
  [false, false, 'D', false, false]
];

const result = require('fs').readFileSync('input.txt').toString()
  .split('\n')
  .map(item => item.trim())
  .map(item => item.split(''))
  .map(item => item.map(char => {
    if (char === 'U') return { x: 0, y: -1 };
    if (char === 'D') return { x: 0, y: 1 };
    if (char === 'L') return { x: -1, y: 0 };
    if (char === 'R') return { x: 1, y: 0 };
  }))
  .map(item => item.reduce((prev, curr) => {
    let x = curr.x + prev.x;
    let y = curr.y + prev.y;
    x = x >= 0 ? x : 0;
    y = y >= 0 ? y : 0;
    x = x <= 4 ? x : 4;
    y = y <= 4 ? y : 4;

    return {
      x: grid[y][x] !== false ? x : prev.x,
      y: grid[y][x] !== false ? y : prev.y
    };
  }, { x: 0, y: 2 }))
  .map(item => grid[item.y][item.x])
  .join('');
console.log(result);
