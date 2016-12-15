'use strict';

const md5 = require('js-md5');
const input = 'ihaygndm';

let pentaChecks = [];
let keys = [];

const isTriplet = new RegExp(/(.)\1\1/);

const test = [];

let counter = 0;
while(keys.length <= 63) {
  let hash = md5(`${input}${counter}`);
  for (let i = 0; i < 2016; i++) {
    hash = md5(hash);
  }

  pentaChecks = pentaChecks.filter(item => item.loopCount + 1001 > counter)
  .map(item => {
    if (hash.indexOf(item.check) !== -1) {
      keys.push(Object.assign({}, item, { match: hash, matchIndex: counter }));
      return Object.assign({}, item, { used: true, });
    } else {
      return item;
    }
  })
  .filter(item => !item.shown);
  
  if (isTriplet.test(hash)) {
    const letter = isTriplet.exec(hash)[0][0];
    pentaChecks.push({
      check: new Array(5).fill(letter).join(''),
      hash: hash,
      loopCount: counter
    });
    test.push({ hash, counter });
  }

  counter++;
}

keys = keys.sort((a, b) => {
  if (a.loopCount === b.loopCount) return 0;
  return a.loopCount < b.loopCount
    ? -1
    : 1;
})

console.log(keys[63].loopCount);

// 22551 too high