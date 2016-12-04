'use strict';

const fs = require('fs');
const path = require('path');

let position = { x: 1, y: 1 };

const result = fs.readFileSync(path.join('input.txt')).toString()
  .split('\n').map(item => item.trim().split('['))
  .map(item => item.map(part => 
    part.replace(/[\]]/g, '')
  )).map(item => { 
    const name = item[0].split('-');
    const id = parseInt(name.pop(), 10);
    return { 
      name: name.join('').split(''), 
      checksum: item[1],
      id 
    }
  })
  .map(item => {
    item.name = item.name.reduce((prev, curr) => {
      if (Object.keys(prev).indexOf(curr) >= 0) prev[curr] += 1;
      else prev[curr] = 1;
      return prev;
    }, {});
    return item;
  })
  .map(item => {
    item.name = Object.keys(item.name)
      .map(char => {
        return { letter: char, count: item.name[char] };
      });
    return item;
  })
  .map(item => {
    const name = item.name.reduce((prev, curr) => {
        if (prev[`${curr.count}`] !== undefined) prev[`${curr.count}`].push(curr);
        else prev[`${curr.count}`] = [curr];
        return prev;
      }, new Array())
      .reverse()
      .map(sub => sub.sort((a, b) => {
        if (a.letter > b.letter) return 1;
        else if (a.letter < b.letter) return -1;
        return 0;
      }))
      .reduce((prev, curr) => prev.concat(curr), []);
    return Object.assign({}, item, { name });
  })
  .map(item => {
    item.name = item.name.map(char => char.letter).join('');
    return item;
  })
  .reduce((prev, curr) => curr.name.substring(0 , 5) === curr.checksum
      ? prev + curr.id : prev , 0);
console.log(result);