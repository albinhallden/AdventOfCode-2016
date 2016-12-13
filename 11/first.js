'use strict';

const startTime = Date.now();

const fs = require('fs');
const path = require('path');

let maxLevel = 0;
const data = fs.readFileSync(path.join('inputFirst.txt')).toString()
  .split('\n').map(item => item.trim())
  .map((item, index) => {
    if (index > maxLevel) maxLevel = index;
    return item;
  })
  .map(item => item
    .replace(/The\s\w+\sfloor\scontains\s(a\s)?(nothing\srelevant)?/g, '')
    .replace(/\sa\s/g, '|')
    .replace(/[\,\.]/g, '')
    .replace(/\sand/g, '')
    .split('|'))
  .map((item, index) => item.reduce((prev, curr) => {
    const temp = curr.split(' ');
    if (temp.length === 2) {
      prev[temp[0].substring(0, 2) + temp[1].substring(0, 1)] = index;
    }
    return prev;
  }, {}))
  .reduce((prev, curr) => Object.assign({}, prev, curr), {});

function getTableKey(floors) {
  return Object.keys(floors.data)
    .sort()
    .map(item => `${item}:${floors.data[item]}`)
    .join('|') + `|elevator:${floors.elevator}`;
}


function getItemsFromFloor(items, floor) {
  return Object.keys(items)
    .map(item => {
      const returnObj = {};
      returnObj[item] = items[item];
      return returnObj;
    })
    .filter(item => items[Object.keys(item)[0]] === floor);
}

function areAllItemsOnTopFloor(items, topFloor) {
  return Object.keys(items)
    .map(item => items[item])
    .every(item => item === topFloor);
}

function isMoveAllowed(items) {
  const chips = Object.keys(items)
    .filter(item => item[2] === 'm');

  return chips.every(chip => {
    const floorGenerators = getItemsFromFloor(items, items[chip])
      .filter(item => Object.keys(item)[0][2] === 'g');
    
    const pairCheck = floorGenerators.filter(item => {
      return chip.substring(0, 2) === Object.keys(item)[0].substring(0, 2);
    }).length === 1;

    return pairCheck
      ? pairCheck
      : floorGenerators.length === 0;
  });
}

const start = { data, steps: 0, elevator: 0 };
const queue = [start];
const visited = {};
visited[getTableKey(start)] = true;
let loop = 0;
while(queue.length > 0) {
  const current = queue.shift();

  if (areAllItemsOnTopFloor(current.data, maxLevel)) {
    console.log('Done!', current.steps);
    break;
  }

  const floorItems = getItemsFromFloor(current.data, current.elevator);
  const possibleFloorCombinations = [];
  for (let i = 0; i < floorItems.length; i++) {
    possibleFloorCombinations.push([floorItems[i]]);
    for (let n = i + 1; n < floorItems.length; n++) {
      possibleFloorCombinations.push([floorItems[i], floorItems[n]]);
    }
  }

  const minElevatorMove = current.elevator <= 0 ? 0 : current.elevator - 1;
  const maxElevatorMove = current.elevator >= 3 ? 3 : current.elevator + 1;
  for (let i = minElevatorMove; i <= maxElevatorMove; i++) {
    if (i !== current.elevator) {
      possibleFloorCombinations
        .map(item => {
          return item.map(sub => Object.keys(sub)[0]);
        })
        .forEach(item => {
          const newMove = Object.assign({}, {
            data: Object.assign({}, current.data),
            steps: current.steps + 1,
            elevator: i
          });

          item.forEach(key => {
            newMove.data[key] = i;
          });

          if (visited[getTableKey(newMove)] === undefined && isMoveAllowed(newMove.data)) {
            visited[getTableKey(newMove)] = true;
            queue.push(newMove);
          }
        });
    }
  }
}

const endTime = Date.now();
console.log('Time:', (endTime - startTime), 'milliseconds');