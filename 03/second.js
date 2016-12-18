'use strict';

const result = require('fs').readFileSync('input.txt').toString()
  .split('\n')
  .map(item => item.trim())
  .map(item => item.split(/\s{2,}/))
  .reduce((prev, curr) => {
    prev[0].push(curr[0]);
    prev[1].push(curr[1]);
    prev[2].push(curr[2]);
    return prev;
  }, [[],[],[]])
  .reduce((prev, curr) => prev.concat(curr), [])
  .map(item => parseInt(item, 10))
  .reduce((prev, curr, index, array) => {
    if ((index + 1) % 3 === 0) prev.push([array[index - 2], array[index - 1], array[index]]);
    return prev;
  }, [])
  .map(item => item.sort((a, b) => b < a))
  .reduce((prev, curr) => curr[0] + curr[1] > curr[2] ? prev + 1 : prev, 0);
console.log(result);
