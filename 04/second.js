'use strict';

const fs = require('fs');
const path = require('path');

const result = fs.readFileSync(path.join('input.txt')).toString()
  .split('\n')
  .map(item => item.trim().split('['))
  .map(item => 
    item.map(part => part.replace(/[\]]/g, ''))
  )
  .map(item => { 
    const name = item[0].split('-');
    const id = parseInt(name.pop(), 10);
    return { 
      name: name.join(''), 
      checksum: item[1],
      id
    }
  })
  .map(item => Object.assign({}, item, { 
    name: item.name.split('').map(char => 
      char === ' ' ? char : String.fromCharCode((char.charCodeAt(0) - 97 + item.id) % 26 + 97)
    )
  }))
  .map(item => Object.assign({}, item, { name: item.name.join('') }))
  .filter(item => item.name.substring(0, 5) === 'north');
console.log(result);