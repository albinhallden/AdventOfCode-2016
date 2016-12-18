'use strict';

const md5 = require('js-md5');
const input = 'cxdnnyjw';

let counter = 0;
let password = '';
do {
  const hashed = md5.hex(`${input}${counter}`);
  if (hashed.startsWith('00000')) password += hashed[5];
  counter++;
} while (password.length < 8);

console.log({password});
