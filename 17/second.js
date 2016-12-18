const md5 = require('js-md5');

const input = 'vkjiggvb';
const isOpen = /[bcdef]/;

const map = {};

function getKey(x, y) {
  return `${x}|${y}`;
}

[
  '#########',
  '#S| | | #',
  '#-#-#-#-#',
  '# | | | #',
  '#-#-#-#-#',
  '# | | | #',
  '#-#-#-#-#',
  '# | | |  ',
  '####### V'
].map(item => item.split(''))
.map((row, y) => {
  row.map((item, x) => {
    if (item === '-') {
      map[getKey(x, y - 1)] = Object.assign({}, map[getKey(x, y - 1)], { U: getKey(x, y - 3), D: getKey(x, y + 1), x, y: y - 1 });
      map[getKey(x, y + 1)] = Object.assign({}, map[getKey(x, y + 1)], { U: getKey(x, y - 1), D: getKey(x, y + 3), x, y: y + 1 });
    } else if (item === '|') {
      map[getKey(x - 1, y)] = Object.assign({}, map[getKey(x - 1, y)], { R: getKey(x + 1, y), L: getKey(x - 3, y), x: x - 1, y });
      map[getKey(x + 1, y)] = Object.assign({}, map[getKey(x + 1, y)], { R: getKey(x + 3, y), L: getKey(x - 1, y), x: x + 1, y });
    }
    return item;
  })
  return row;
});

function traverse(nextKey, path) {
  const item = map[nextKey];
  const hash = md5(`${input}${path}`).substr(0, 4);

  if (item.x === 7 && item.y === 7) return path;
  
  const goUp = isOpen.test(hash[0]) && item.U !== undefined && item.y > 1;
  const goDown = isOpen.test(hash[1]) && item.D !== undefined && item.y < 7;
  const goLeft = isOpen.test(hash[2]) && item.L !== undefined && item.x > 1;
  const goRight = isOpen.test(hash[3]) && item.R !== undefined && item.x < 7;

  const paths = [];
  if (goUp) {
    const pathUp = traverse(item.U, `${path}U`);
    if (pathUp) paths.push(pathUp);
  }
  if (goDown) {
    const pathDown = traverse(item.D, `${path}D`);
    if (pathDown) paths.push(pathDown);
  } 
  if (goLeft) {
    const pathLeft = traverse(item.L, `${path}L`);
    if (pathLeft) paths.push(pathLeft);
  }
  if (goRight) {
    const pathRight = traverse(item.R, `${path}R`);
    if (pathRight) paths.push(pathRight);
  }

  const thePath = paths.reduce((prev, curr) => {
    if (prev === undefined || curr.length > prev.length) {
      return curr;
    }
    return prev;
  }, undefined);
  return thePath;
}

console.log(traverse(getKey(1,1), '').length);