'use strict';

const xLength = 500;
const yLength = 500;
const input = 1352;

function runFormula(x, y) {
  return x*x + 3*x + 2*x*y + y + y*y;
}

function getBits(number) {
  return number.toString(2);
}
const map = new Array(10);

for (let x = 0; x < xLength; x++) {
  map[x] = new Array(10);
  for (let y = 0; y < yLength; y++) {
    const number = runFormula(y, x);
    const bits = getBits(number + input);
    const isOdd = bits.split('').filter(item => item === '1').length % 2 === 0;
    map[x][y] = isOdd;
  }
}

const start = { x: 1, y: 1 };
const nextTargets = [start];
const visited = {};
let found = false;
while(nextTargets.length !== 0) {
  const current = nextTargets.shift();
  current.steps = current.steps === undefined ? 0 : current.steps;

  if (current.steps <= 50) {
    visited[`x${current.x}y${current.y}`] = current;
    let minX = current.x - 1 < 0 ? 0 : current.x - 1;
    let maxX = current.x + 1 === xLength ? current.x : current.x + 1;
    let minY = current.y - 1 < 0 ? 0 : current.y - 1;
    let maxY = current.y + 1 === xLength ? current.y : current.y + 1;
    
    for (let x = minX; x <= maxX; x++) {
      if (map[x][current.y] === true && visited[`x${x}y${current.y}`] === undefined) {
        nextTargets.push({ x, y: current.y, steps: current.steps + 1 });
      }
    }
    for (let y = minY; y <= maxY; y++) {
      if (map[current.x][y] === true && visited[`x${current.x}y${y}`] === undefined) {
        nextTargets.push({ x: current.x, y, steps: current.steps + 1 });
      }
    }
  }
}

console.log(Object.keys(visited).length);