import { Character } from "./Character";
import { Sprite } from "./Sprite";
import { Vector } from "./Vector";
import type { Game } from "./Game";

export class Rat {
    game: Game;
    character: Character;
    counter: number = 0;
    current: number = 0;
    sprite: Sprite;
    cooldown: number = 0;
    cooldownCounter: number = 0;
    state: 'run' | 'caught' = 'run';

    constructor(position: Vector, game: Game) {
        this.game = game;
        this.character = new Character({
            width: 20,
            height: 20,
            speed: 2.8,
            position,
            hp: 100,
            game,
        });
        this.sprite = new Sprite(game.resources['rat'], {
            run: { width: 32, height: 32, gap: 0, count: 10, interval: 200, finite: false, sx: 2, sy: 80 },
            death: { width: 32, height: 32, gap: 0, count: 10, interval: 100, finite: true, sx: 2, sy: 140 }
        })

        this.character.direction = Vector.random();
        this.state = 'run';
        this.sprite.play('run');

        this.setCounter();
    }

    setCounter() {
        this.current = 0;
        this.counter = 150 + Math.floor(Math.random() * 400);
    }

    update(delta: number) {
        const scene = this.game.scene;

        if (!scene) {
            return;
        }

        const prevPosition = this.character.position.clone();

        this.current += 1;

        if (this.current === this.counter) {
            this.character.direction = Vector.random();
            this.setCounter();
        }

        if (this.state === 'caught') {
            this.cooldownCounter += 1;
        }

        if (this.cooldownCounter === this.cooldown) {
            this.state = 'run';
            this.sprite.play('run');
        }

        if (this.state === 'run') {
            this.character.update(false);

            while (this.character.position.equal(prevPosition)) {
                this.character.direction = Vector.random();
                this.character.update(false);
            }

            for (const projectile of scene.projectiles) {
                const distance = projectile.position.dist(this.character.position);

                if (this.state === 'run' && distance <= 16 && projectile.speed > 2) {
                    this.state = 'caught';
                    this.sprite.play('death');
                    this.cooldown = 250;
                    this.cooldownCounter = 0;
                    this.character.hp -= 10;
                    break;
                }
            }
        }

        if (this.character.direction.x < 0) {
            this.sprite.hi = false;
        } else if (this.character.direction.x > 0) {
            this.sprite.hi = true;
        }

        this.sprite.update(delta);
    }

    draw(context: CanvasRenderingContext2D) {
        const x = this.character.position.x;
        const y = this.character.position.y;
        this.sprite.draw(context, x, y, 64, 64);

        context.beginPath();
        context.fillStyle = 'red';
        context.rect(x - 10, y - 32, 32, 4);
        context.fill();
        context.closePath();
        context.beginPath();
        context.fillStyle = 'green';
        context.rect(x - 10, y - 32, 32 * (this.character.hp / 100), 4);
        context.fill();
        context.closePath();
    }
}