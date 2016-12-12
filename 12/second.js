'use strict';

const fs = require('fs');
const path = require('path');

const obj = { a: 0, b: 0, c: 1, d: 0 };

const data = fs.readFileSync(path.join('input.txt')).toString()
  .split('\n').map(item => item.trim())
  .map(item => {
    const values = item.split(' ');
    values[1] = !Number.isNaN(parseInt(values[1], 10))
      ? parseInt(values[1], 10) : values[1];
    values[2] = !Number.isNaN(parseInt(values[2], 10))
      ? parseInt(values[2], 10) : values[2];
    return values;
  });

for (let i = 0; i < data.length; i++) {
  const values = data[i];
  if (values[0] === 'cpy') {
    Number.isInteger(values[1])
      ? obj[values[2]] = values[1]
      : obj[values[2]] = obj[values[1]];
  } else if (values[0] === 'jnz') {
    const number = Number.isInteger(values[1])
      ? values[1]
      : obj[values[1]];
    if (number !== 0) {
      i += values[2] - 1;
    }
  } 
  else if (values[0] === 'inc') obj[values[1]]++;
  else if (values[0] === 'dec') obj[values[1]]--;
}

console.log(obj.a);
