enum MENUOPTIONS {
  New_Game = 0,
  Continue = 1,
  Credits = 2
}

export class MenuScene extends Phaser.Scene {
  private currentMenuIndex = 0;
  private menu: Phaser.GameObjects.Text[] = [];

  constructor() {
    super('MenuScene');
  }

  /**
   * funzione dedicata al caricamento di risorse (sprites, musiche ecc.)
   */
  preload(): void {
  }

  /**
   * Funzione dedicata al caricamento di dati
   */
  init(): void {
    this.input.keyboard.on('keyup-UP', () => (this.currentMenuIndex = this.currentMenuIndex <= 0 ? 0 : this.currentMenuIndex - 1));
    this.input.keyboard.on('keyup-DOWN', () => (this.currentMenuIndex = this.currentMenuIndex >= this.menu.length - 1 ? this.menu.length - 1 : this.currentMenuIndex + 1));
    this.input.keyboard.on('keyup-ENTER', () => this.menuSelected(this.currentMenuIndex));
  }

  /**
   * Funzione dedicata alla predisposizione di sprites nella scena
   */
  create(): void {
    let label = this.add.text(0, 0, "New Game");
    label.setX(this.cameras.main.centerX - label.width / 2);
    label.setY(200);
    label.setFontStyle("bold");
    this.menu.push(label);

    label = this.add.text(0, 0, "Continue");
    label.setX(this.cameras.main.centerX - label.width / 2);
    label.setY(250);
    this.menu.push(label);

    label = this.add.text(0, 0, "Credits");
    label.setX(this.cameras.main.centerX - label.width / 2);
    label.setY(300);
    this.menu.push(label);
  }

  /**
   * Funzione di update dei frames ecc.
   */
  update(): void {
    this.updateMenu();
  }

  private updateMenu() {
    this.menu.forEach(menu => menu.setFontStyle("normal"));

    this.menu[this.currentMenuIndex].setFontStyle("bold");
  }

  private menuSelected(menuIndex
    : number) {
    const menuSelected = <MENUOPTIONS>menuIndex;

    switch (menuSelected) {
      case MENUOPTIONS.Continue: {
        // do continue...
        break;
      }
      case MENUOPTIONS.New_Game: {
        this.scene.start("LoadingScene", {level: "Level1"});
        break;
      }
      case MENUOPTIONS.Credits: {
        // do credits...
        break;
      }
    }
  }
}
