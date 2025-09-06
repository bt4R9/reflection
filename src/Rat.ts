import { Character } from "./Character";
import { Sprite } from "./Sprite";
import { Vec } from "./Vector";
import type { Game } from "./Game";

export class Rat {
    game: Game;
    c: Character;
    counter: number = 0;
    current: number = 0;
    sprite: Sprite;
    cooldown: number = 0;
    cooldownCounter: number = 0;
    state: 'run' | 'caught' = 'run';

    constructor(p: [number, number], game: Game) {
        this.game = game;
        this.c = new Character(new Vec(p[0], p[1]), 10, 10, 2.8, 100, game);

        this.sprite = new Sprite(game.resources['rat'], {
            run: [8, 86, 16, 10, 10, 16, 200, false],
            death: [8, 150, 16, 10, 10, 16, 100, true]
        });

        this.c.d = Vec.random();
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

        const prevPosition = this.c.p.clone();

        this.current += 1;

        if (this.current === this.counter) {
            this.c.d = Vec.random();
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
            this.c.update();

            while (this.c.p.equal(prevPosition)) {
                this.c.d = Vec.random();
                this.c.update();
            }

            for (const projectile of scene.projectiles) {
                const distance = projectile.p.dist(this.c.p);

                if (this.state === 'run' && distance <= 16 && projectile.speed > 2) {
                    this.state = 'caught';
                    this.sprite.play('death');
                    this.game.sound.playEffect('stun');
                    this.cooldown = 250;
                    this.cooldownCounter = 0;
                    this.c.hp -= 10;
                    break;
                }
            }
        }

        if (this.c.d.x < 0) {
            this.sprite.hi = false;
        } else if (this.c.d.x > 0) {
            this.sprite.hi = true;
        }

        this.sprite.update(delta);
    }

    draw(context: CanvasRenderingContext2D) {
        const x = this.c.p.x;
        const y = this.c.p.y;
        this.sprite.draw(context, x, y, 16 * 2, 10 * 2);

        context.beginPath();
        context.fillStyle = 'red';
        context.rect(x - 10, y - 24, 32, 4);
        context.fill();
        context.closePath();
        context.beginPath();
        context.fillStyle = 'green';
        context.rect(x - 10, y - 24, 32 * (this.c.hp / 100), 4);
        context.fill();
        context.closePath();

        if (this.game.scene?._debug) {
            context.fillStyle = 'red';

            context.beginPath();
            context.ellipse(this.c.p.x, this.c.p.y, 3, 3, Math.PI / 4, 0, 360);
            context.fill();
            context.closePath();
        }
    }
}