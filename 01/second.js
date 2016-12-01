'use strict';

const fs = require('fs');
const path = require('path');

const dirs = ['N', 'E', 'S', 'W'];

let direction = 0; // 0 = N, 1 = E, 2 = S, 3 = W
let stepsX = 0;
let stepsY = 0;

const map = {};
let interlapsFound = false;

fs.readFileSync(path.join('input.txt')).toString()
  .split(',')
  .map(item => item.trim())
  .forEach(item => {
    direction = item[0] === 'R' ? direction + 1 : direction - 1;
    direction = direction < 0 ? 3 : direction;
    
    const length = parseInt(item.substring(1));

    // Check map and add spot
    let tempX = stepsX;
    let tempY = stepsY;
    for (let i = 1; i <= length; i++) {
      if (!interlapsFound) {  
        if (direction % 4 === 0) tempY++;
        else if (direction % 4 === 1) tempX++;
        else if (direction % 4 === 2) tempY--;
        else if (direction % 4 === 3) tempX--;
        
        if (map[`${tempX},${tempY}`]) {
          console.log(`Been here before: x:${tempX}, y:${tempY}. temp away: ${(tempY < 0 ? tempY *= -1 : tempY) + (tempX < 0 ? tempX *= -1 : tempX)}`);
          interlapsFound = true;
        }

        map[`${tempX},${tempY}`] = true;
      }
    }

    if (direction % 4 === 0) stepsY += length;
    else if (direction % 4 === 1) stepsX += length;
    else if (direction % 4 === 2) stepsY -= length;
    else if (direction % 4 === 3) stepsX -= length;
  });

console.log((stepsY < 0 ? stepsY *= -1 : stepsY) + (stepsX < 0 ? stepsX *= -1 : stepsX));