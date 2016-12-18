'use strict';

const result = require('fs').readFileSync('input.txt').toString()
  .split('\n').map(item => item.trim())
  .reduce((prev, curr) => {
    if (prev.length === 0) prev = new Array(curr.length).fill('');
    return curr.split('').map((item, index) => prev[index] += item);
  }, [])
  .map(item => item.split('').reduce((prev, curr) => {
    if (prev[curr] === undefined) prev[curr] = 0;
    prev[curr]++;
    return prev;
  }, {}))
  .map(item => Object.keys(item).map(sub => {
    return { key: sub, count: item[sub] };
  }))
  .map(item => item.sort((a, b) => {
    if (a.count === b.count) return 0;
    if (a.count > b.count) return 1;
    return -1;
  })[0].key).join('');
console.log(result);
