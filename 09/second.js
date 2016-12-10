'use strict';

const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join('input.txt')).toString()
  .split('\n').map(item => item.trim())[0];

function getDecompressedLength(str) {
  let length = str.length;

  for (let i = 0; i < str.length; i++) {
    if (str[i] !== '(') continue;
    const match = str.substr(i).match(/^\((\d+)x(\d+)\)/);
    const matchLength = parseInt(match[1], 10);
    const times = parseInt(match[2], 10);
    const start = i + match[0].length;
    const matchStr = str.substr(start, matchLength);
    const decompressedLength = getDecompressedLength(matchStr);
    
    length += decompressedLength * times - matchStr.length - match[0].length;
    i = start + matchStr.length - 1;
  }

  return length;
}

console.log(getDecompressedLength(data));