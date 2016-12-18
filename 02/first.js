'use strict';

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
    x = x <= 2 ? x : 2;
    y = y <= 2 ? y : 2;
    return { x, y };
  }, { x: 1, y: 1 }))
  .map(item => item.y * 3 + item.x % 3 + 1)
  .join('');
console.log(result);