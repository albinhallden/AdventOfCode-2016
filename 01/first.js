'use strict';

const fs = require('fs');
const path = require('path');

let direction = 0; // 0 = N, 1 = E, 2 = S, 3 = W

const result = fs.readFileSync(path.join('input.txt')).toString()
  .split(',')
  .map(item => item.trim())
  .reduce((prev, curr) => {
    direction = curr[0] === 'R' ? direction + 1 : direction - 1;
    direction = direction < 0 ? 3 : direction;
    
    if (direction % 4 === 0) prev.y += parseInt(curr.substring(1));
    else if (direction % 4 === 1) prev.x += parseInt(curr.substring(1));
    else if (direction % 4 === 2) prev.y -= parseInt(curr.substring(1));
    else if (direction % 4 === 3) prev.x -= parseInt(curr.substring(1));
    return prev;
  }, { x: 0, y: 0 });

console.log((result.y < 0 ? result.y *= -1 : result.y) + (result.x < 0 ? result.x *= -1 : result.x));