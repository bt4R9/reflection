import { Ray } from "./Ray";
import { Sprite } from "./Sprite";
import type { Vector } from "./Vector";
import type { Game } from "./Game";

export class Projectile {
    position: Vector;
    direction: Vector;
    game: Game;
    speed: number;
    active: boolean = true;

    sprite: Sprite;

    bounce: number = 0;
    private maxBounces: number = Infinity;

    constructor(position: Vector, direction: Vector, game: Game, speed = 4) {
        this.position = position;
        this.direction = direction;
        this.game = game;
        this.speed = speed;

        this.sprite = this.game.sprites['ball'];

        this.sprite.play('run');
        this.sprite.rotate(direction);
    }

    update(delta: number) {
        const scene = this.game.scene;

        if (!scene) {
            return;
        }

        if (this.bounce >= this.maxBounces) {
            this.active = false;
            return false;
        }

        this.position = this.position.add(this.direction.scale(this.speed));
        this.sprite.update(delta);
        this.speed *= 0.9985;

        for (const entity of scene.allEntities) {
            if (entity) {
                const line = entity.intersect(this.position, 8);

                if (line) {
                    this.bounce += 1;
                    const ray = new Ray(this.position, this.direction);

                    this.direction = ray.reflect(line);
                    this.sprite.rotate(this.direction);

                    break;
                }
            }
        }

        return true;
    }
}