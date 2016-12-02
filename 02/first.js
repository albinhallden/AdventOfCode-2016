'use strict';

const fs = require('fs');
const path = require('path');

let current = 5;

const result = fs.readFileSync(path.join('input.txt')).toString()
  .split('\n')
  .map(item => item.trim())
  .map(item => item.split(''))
  .map(item => {
    item.forEach(char => {
      switch(char) {
        case 'U':
          current = current - 3 < 1 ? current : current - 3; 
          // console.log('U', current);
          break;
        case 'D':
          current = current + 3 > 9 ? current : current + 3;
          // console.log('D', current);
          break;
        case 'L':
          current = current % 3 === 1 ? current : current - 1;
          // console.log('L', current);
          break;
        case 'R':
          current = current % 3 === 0 ? current : current + 1;
          // console.log('R', current);
          break;
      }
    });
    return current;
  });
console.log(result);