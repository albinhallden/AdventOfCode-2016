const fs = require('fs');

const length = 40;
const data = fs.readFileSync('input.txt').toString()
  .split('\n')
  .map(item => item.split(''));
const width = data[0].length;

while (data.length < length) {
  const prevRow = data[data.length - 1];
  const row = new Array(width).fill('.')
    .map((item, index) => {
      const left = index < 1 ? '.' : prevRow[index - 1];
      const center = prevRow[index];
      const right = index >= width - 1 ? '.' : prevRow[index + 1];

      if ( (left === '^' && center === '^' && right === '.')
        || (left === '.' && center === '^' && right === '^')
        || (left === '^' && center === '.' && right === '.')
        || (left === '.' && center === '.' && right === '^')) {
        return '^';
      } else {
        return '.';
      }
    });

  data.push(row);
}

const result = data.reduce((prev, curr) => {
  return prev + curr.join('').replace(/\^/g, '').length;
}, 0);

console.log(result);