import type { Game } from "./Game";
import { Vector } from "./Vector";

export interface CharacterParams {
    position: Vector;
    width: number;
    height: number;
    speed: number;
    hp: number;
    game: Game;
}

export class Character {
    position: Vector;
    width: number;
    height: number;
    speed: number;
    hp: number;
    direction: Vector;
    game: Game;

    constructor(params: CharacterParams) {
        this.position = params.position;
        this.width = params.width;
        this.height = params.height;
        this.speed = params.speed;
        this.hp = params.hp;
        this.game = params.game;
        this.direction = new Vector(0, 0);
    }

    wouldCollide(next: Vector) {
        const scene = this.game.scene;
        if (!scene) return false;

        for (const entity of scene.allEntities) {
            if (entity.intersect(next, Math.max(this.width, this.height))) {
                return true;
            }
        }

        return false;
    }

    update(smooth: boolean) {
        if (this.speed === 0) {
            return;
        }

        const move = this.direction.scale(this.speed);

        const nextX = this.position.add(new Vector(move.x, 0));
        const nextY = this.position.add(new Vector(0, move.y));
        const nextXY = this.position.add(move);

        if (smooth) {
            if (!this.wouldCollide(nextXY)) {
                this.position = nextXY;
            } else {
                let moved = false;

                if (!this.wouldCollide(nextX)) {
                    this.position = nextX;
                    moved = true;
                }

                if (!this.wouldCollide(nextY)) {
                    this.position = nextY;
                    moved = true;
                }

                if (!moved) {
                    this.position = this.position;
                }
            }
        } else {
            if (!this.wouldCollide(nextXY)) {
                this.position = nextXY;
            }
        }
    }
}