'use strict';

const fs = require('fs');
const path = require('path');

const dirs = ['N', 'E', 'S', 'W'];

let direction = 0; // 0 = N, 1 = E, 2 = S, 3 = W
let stepsX = 0;
let stepsY = 0;

fs.readFileSync(path.join('input.txt')).toString()
  .split(',')
  .map(item => item.trim())
  .forEach(item => {
    direction = item[0] === 'R' ? direction + 1 : direction - 1;
    direction = direction < 0 ? 3 : direction;
    
    const length = parseInt(item.substring(1));

    if (direction % 4 === 0) stepsY += length;
    else if (direction % 4 === 1) stepsX += length;
    else if (direction % 4 === 2) stepsY -= length;
    else if (direction % 4 === 3) stepsX -= length;
  });

console.log((stepsY < 0 ? stepsY *= -1 : stepsY) + (stepsX < 0 ? stepsX *= -1 : stepsX));