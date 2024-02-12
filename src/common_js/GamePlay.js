import {findNewPosition, generatorRandomNumber, getCellIndex} from "./utilits";

export default class GamePlay {
  constructor(boardSize) {
    this.boardSize = boardSize;
    this.cells = [];
    this.addCellClickListeners = [];
  }

  fillingDOM(root) {
    const infoEl = document.createElement('div');
    infoEl.classList.add('infoContainer');
    root.appendChild(infoEl);

    this.pointsInfoEl = document.createElement('span');
    this.pointsInfoEl.classList.add('points','info');
    infoEl.appendChild(this.pointsInfoEl);

    this.failedInfoEl = document.createElement('span');
    this.failedInfoEl.classList.add('failed','info');
    infoEl.appendChild(this.failedInfoEl);

    const boardContainerEl = document.createElement('div');
    boardContainerEl.classList.add('board-container');
    root.appendChild(boardContainerEl)

    const boardEl = document.createElement('div');
    boardEl.classList.add('board');
    boardContainerEl.appendChild(boardEl)

    for (let y = 0; y < this.boardSize; y++) {
      const rowEl = document.createElement('div');
      rowEl.classList.add('row');
      boardEl.appendChild(rowEl);

      for (let x = 0; x < this.boardSize; x++) {
        const cellEl = document.createElement('div');
        cellEl.classList.add('cell');
        cellEl.dataset.x = `${x}`;
        cellEl.dataset.y = `${y}`;
        cellEl.dataset.index = `${getCellIndex(x, y, this.boardSize)}`
        this.cells.push({cell: cellEl, x, y});
        cellEl.addEventListener('click', event => this.onCellClick(event));
        rowEl.appendChild(cellEl);
      }
    }
    this.gameOverEl = document.createElement('div');
    this.gameOverEl.classList.add('gameOver');
    root.appendChild(this.gameOverEl);

    const gameOverMessageEl = document.createElement('span');
    gameOverMessageEl.classList.add('gameOverMessage');
    gameOverMessageEl.textContent = 'GAME OVER';
    this.gameOverEl.appendChild(gameOverMessageEl);
  }

  drawGnome() {
    if (!this.gnomeElCoordinates) {
      const x = generatorRandomNumber(0, this.boardSize - 1);
      const y = generatorRandomNumber(0, this.boardSize - 1);
      this.gnomeElCoordinates = {x, y}
    } else {
      this.gnomeElCoordinates = findNewPosition(this.boardSize, this.gnomeElCoordinates.x, this.gnomeElCoordinates.y);
      this.deleteGnome();
    }
    const index = getCellIndex(this.gnomeElCoordinates.x, this.gnomeElCoordinates.y, this.boardSize)
    const cell = this.cells.filter(x => x.cell.dataset.index === `${index}`)[0].cell;
    cell.classList.add('gnome');
  }

  deleteGnome(){
    if (document.querySelector('.gnome')) {
      document.querySelector('.gnome').classList.remove('gnome');
    }
  }

  addCellClickListener(callback) {
    this.addCellClickListeners.push(callback);
  }

  onCellClick(e) {
    const cell = this.cells.filter(x => x.cell.dataset.index === e.target.dataset.index)[0];
    this.addCellClickListeners[0](cell.x, cell.y)
  }

  drawPoints(points) {
    this.pointsInfoEl.textContent = `points: ${points}`;
  }

  drawFailed(failedGnomes){
    failedGnomes--;
    failedGnomes = failedGnomes < 0 ? 0 : failedGnomes;
    this.failedInfoEl.textContent = `failed: ${failedGnomes}`;
}

  gameOver() {
    this.gameOverEl.style.display = 'flex';
  }

}
