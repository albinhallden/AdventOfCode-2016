'use strict';

Object.prototype.checkPattern = function() {
  const betweens = this.betweens;
  const regulars = this.regulars;

  let counter = 0;
  const letters = regulars.join('|').split('');
  const betweeners = betweens.join('|');
  while(counter < letters.length - 2) {
    if (letters[counter] === letters[counter + 2] && letters[counter] !== letters[counter + 1]
      && betweeners.includes(`${letters[counter + 1]}${letters[counter]}${letters[counter + 1]}`)) return true;
    counter ++;
  }
  return false;
}

const result = require('fs').readFileSync('input.txt').toString()
  .split('\n').map(item => item.trim())
  .map(item => item.split(/[\[\]]/))
  .map(item => item.reduce((prev, curr, index) => {
    if (index % 2 === 0) prev.regulars.push(curr);
    else prev.betweens.push(curr);
    return prev;
  }, { regulars: [], betweens: [] }))
  .map(item => item.checkPattern())
  .reduce((prev, curr) => {
    if (curr) prev++;
    return prev;
  }, 0);;
console.log(result);
