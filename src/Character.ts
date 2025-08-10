import type { Sprite } from "./Sprite";
import { Vector } from "./Vector";

export interface CharacterParams {
    position: Vector;
    width: number;
    height: number;
    speed: number;
    sprite?: Sprite;
}

export class Character {
    position: Vector;
    velocity: Vector;
    width: number;
    height: number;
    speed: number;
    sprite?: Sprite;

    constructor(params: CharacterParams) {
        this.position = params.position;
        this.sprite = params.sprite;
        this.width = params.width;
        this.height = params.height;
        this.speed = params.speed;
        this.velocity = new Vector(0, 0);
    }

    move() {
        if (this.speed !== 0) {
            this.position = this.position.add(this.velocity.scale(this.speed));
        }
    }

    update() {
        this.move();
    }
}