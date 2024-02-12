export default class GameController {
  constructor(gamePlay) {
    this.gamePlay = gamePlay;
  }

  init() {
    this.failedGnomes = 0;
    this.playersPoints = 0;
    this.showGnome();
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
    this.gamePlay.drawPoints(this.playersPoints);
    this.gamePlay.drawFailed(this.failedGnomes);
    this.setIntervalId = setInterval(() => this.showGnome(), 3000);
  }

  onCellClick(x, y) {
    if (this.failedGnomes > 6) {
      return
    }

    if (x === this.gamePlay.gnomeElCoordinates.x && y === this.gamePlay.gnomeElCoordinates.y) {
      this.playersPoints++;
      this.failedGnomes--;
      this.gamePlay.drawPoints(this.playersPoints);
      this.gamePlay.drawFailed(this.failedGnomes);
      this.reStartDrawGnome();
    }
  }

  showGnome() {
    this.failedGnomes++;
    this.gamePlay.drawFailed(this.failedGnomes);
    this.gamePlay.drawGnome();
    this.checkGameEnd();
  }

  reStartDrawGnome() {
    this.gamePlay.deleteGnome();
    clearInterval(this.setIntervalId);
    this.showGnome();
    this.setIntervalId = setInterval(() => this.showGnome(), 3000)
  }

  checkGameEnd() {
    if (this.failedGnomes > 6) {
      clearInterval(this.setIntervalId);
      this.gamePlay.gameOver()
    }
  }

}
