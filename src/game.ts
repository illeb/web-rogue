/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @description  Coin Runner
 * @license      Digitsensitive
 */

import "phaser";
import { GameScene } from "./scenes/game-scene";
import { MenuScene } from "./scenes/MenuScene/menu-scene";
import Dexie from "dexie";

const config: Phaser.Types.Core.GameConfig = {
  title: "web-rogue",
  url: "https://github.com/Luxor001/web-rogue",
  version: "0.0.1",
  width: 768,
  height: 576,
  type: Phaser.AUTO,
  parent: "game",
  scene: [MenuScene, GameScene],
  input: {
    keyboard: true,
    touch: true
  },
  backgroundColor: "#000000",
  render: { pixelArt: true, antialias: false }
};

export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

window.addEventListener("load", () => {
  var game = new Game(config);

});
