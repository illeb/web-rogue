import { timer } from "rxjs";

export class LoadingScene extends Phaser.Scene {
  private menu: Phaser.GameObjects.Text[] = [];

  constructor() {
    super('LoadingScene');
  }

  /**
   * funzione dedicata al caricamento di risorse (sprites, musiche ecc.)
   */
  preload(): void { }

  /**
   * Funzione dedicata al caricamento di dati
   */
  init(data: any): void {
    console.log(data);
    timer(4000).subscribe(() => this.scene.start("GameScene"));
  }

  /**
   * Funzione dedicata alla predisposizione di sprites nella scena
   */
  create(): void {
    let label = this.add.text(0, 0, "Loading...");
    label.setX(this.cameras.main.centerX - label.width / 2);
    label.setY(this.cameras.main.centerY - label.height / 2);
    this.menu.push(label);
  }

  /**
   * Funzione di update dei frames ecc.
   */
  update(): void {}
}

