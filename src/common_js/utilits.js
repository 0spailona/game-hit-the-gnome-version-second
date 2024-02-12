export function generatorRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

export function findNewPosition(boardSize, x, y) {
  let newX = x;
  let newY = y;
  while (newX === x && newY === y) {
    newX = generatorRandomNumber(0, boardSize - 1);
    newY = generatorRandomNumber(0, boardSize - 1);
  }
  return {x: newX, y: newY};
}


export function getCellIndex(x, y, boardSize) {
  return y * boardSize + x;
}
