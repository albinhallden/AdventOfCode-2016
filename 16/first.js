'use strict';

let input = "10010000000110000";
const targetLength = 272;

do {
  const inversed = input.split('')
    .map(item => item === '1' ? '0' : '1')
    .reverse()
    .join('');
  input = `${input}0${inversed}`;
} while (input.length < targetLength);
  
do {
  let checksum = '';
  input = input.substring(0, targetLength);
  for (let i = 0; i < input.length; i+=2) {
    checksum += input[i] === input[i + 1] ? '1' : '0';
  }
  input = checksum;
} while (input.length % 2 !== 1)

console.log(input);