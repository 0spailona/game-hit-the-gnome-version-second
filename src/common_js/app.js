import GamePlay from "./GamePlay";
import GameController from "./GameController";

const gamePlay = new GamePlay(4)

gamePlay.fillingDOM(document.querySelector('#root'));

const controller = new GameController(gamePlay);
controller.init()


