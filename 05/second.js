'use strict';

const md5 = require('js-md5');
const input = 'cxdnnyjw';

let counter = 0;
let password = [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined];
const isNumber = new RegExp('[0-7]');
do {
  const hashed = md5(`${input}${counter}`);
  if (hashed.startsWith('00000') && isNumber.test(hashed[5])) {
    const index = parseInt(hashed[5], 10);
    if (password[index] === undefined) {
      password[index] = hashed[6];
    }
  }
  counter++;
} while (password.indexOf(undefined) !== -1);

console.log(password.join(''));