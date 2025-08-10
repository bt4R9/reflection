import { Sprite } from "./Sprite";
import type { Vector } from "./Vector";

export class Effect {
    position: Vector;
    sprite: Sprite;

    constructor(position: Vector) {
        this.position = position;
        this.sprite = new Sprite('public/explode.png', 50, 50, {
          run: { width: 50, height: 50, gap: 0, count: 7, interval: 250, finite: true, x: 0, y: 0 }
        });
        this.sprite.play('run');
    }

    update(delta: number) { 
      this.sprite.update(delta);
    }

    get finished() {
      return this.sprite.frame?.finished ?? false;
    }
}