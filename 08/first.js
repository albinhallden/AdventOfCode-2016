'use strict';

const x = 50;
const y = 6;
let array = [{x, y}].map(item => {
  let counter = 0;
  const tempArray = [];
  while(counter < item.y) {
    tempArray.push(new Array(item.x).fill('.'));
    counter++;
  }
  return tempArray;
})[0];

const fill = (x, y, array) => {
  for (let iY = 0; iY < y; iY++) {
    for (let iX = 0; iX < x; iX++) {
      array[iY][iX] = '#';
    }
  }
  return array;
}

const rotateColumn = (x, length, array) => {
  for (let loop = 0; loop < length; loop++) {
    let stash = array[array.length - 1][x];
    for(let iY = array.length - 1; iY >= 1; iY--) {
      array[iY][x] = array[iY - 1][x];
    }
    array[0][x] = stash;
  }
  return array;
}

const rotateRow = (y, length, array) => {
  for (let loop = 0; loop < length; loop++) {
    let stash = array[y][array[0].length - 1];
    for(let iY = array[0].length - 1; iY >= 1; iY--) {
      array[y][iY] = array[y][iY - 1];
    }
    array[y][0] = stash;
  }
  return array;
}

const result = require('fs').readFileSync('input.txt').toString()
  .split('\n').map(item => item.trim())
  .map(item => item.split(' '))
  .map(item => {
    if (item[0] === 'rect') {
      const steps = item[1].split('x').map(sub => parseInt(sub, 10));
      array = fill(steps[0], steps[1], array);
    } else if (item[0] === 'rotate' && item[1] === 'column') {
      const steps = item[2].split('x=').map(sub => parseInt(sub, 10));
      array = rotateColumn(steps[1], parseInt(item[4], 10), array);
    } else if (item[0] === 'rotate' && item[1] === 'row') {
      const steps = item[2].split('y=').map(sub => parseInt(sub, 10));
      array = rotateRow(steps[1], parseInt(item[4], 10), array);
    }
    return array;
  });

const temp = result[0].reduce((prev, curr) => {
    return prev + curr.reduce((subPrev, subCurr) => subCurr === '#' ? subPrev + 1 : subPrev, 0);
  }, 0);

console.log(temp);
