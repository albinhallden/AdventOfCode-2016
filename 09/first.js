'use strict';

const fs = require('fs');
const path = require('path');

const result = fs.readFileSync(path.join('input.txt')).toString()
  .split('\n').map(item => item.trim())
  .map(item => {
    let counter = 0;
    while (item.length !== 0) {
      const nextCheck = item.indexOf('(');
      if (nextCheck === -1) {
        counter += item.length;
        item = '';
      } else if (nextCheck > 0) {
        counter += item.substring(0, nextCheck).length;
        item = item.substring(nextCheck);
      } else {
        const closeCheck = item.indexOf(')');
        const check = item.substring(1, closeCheck);
        const numbers = check.split('x').map(num => parseInt(num, 10));
        
        const checkArea = item.substring(closeCheck + 1, numbers[0] + closeCheck + 1);
        counter += (checkArea.length * numbers[1]);
        item = item.substring(numbers[0] + closeCheck + 1);
      }
    }
    return counter;
  });

console.log(result);