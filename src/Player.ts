import { Character } from "./Character";
import type { Game } from "./Game";
import { Projectile } from "./Projectile";
import { Ray } from "./Ray";
import { Sprite } from "./Sprite";
import { Vector } from "./Vector";

export class Player {
    character: Character;
    sprite: Sprite;
    game: Game;
    isAttacking: boolean = false;

    constructor(position: Vector, game: Game) {
        this.game = game;
        this.character = new Character({
            position,
            width: 16,
            height: 16,
            speed: 2.5,
            hp: 100,
            game,
        });
        this.sprite = this.game.sprites['cat'];
    }

    init() {
        this.game.emitter.on('leftClick', this.attack);
        this.game.emitter.on('rightClick', this.throw);
    }

    dispose() {
        this.game.emitter.off('leftClick', this.attack);
        this.game.emitter.off('rightClick', this.throw);
    }

    attack = () => {
        if (!this.isAttacking) {
            this.sprite.play('attack');
            this.isAttacking = true;

            const rats = this.game.scene?.rats ?? [];

            for (const rat of rats) {
                if (this.character.position.dist(rat.character.position) < 30) {
                    rat.character.hp -= 25;
                }
            }
        }
    }

    throw = () => {
        const scene = this.game.scene;

        if (!scene) {
            return;
        }

        if (scene.projectiles.length > 1) {
            return;
        }

        scene.projectiles.push(new Projectile(this.character.position.add(this.ray.direction.scale(10)), this.ray.direction, this.game))
    }

    update(delta: number) {
        const control = this.game.control;

        let direction = new Vector(0, 0);

        if (control.state.get('KeyW')) {
            direction = direction.add(new Vector(0, -1));
        }

        if (control.state.get('KeyS')) {
            direction = direction.add(new Vector(0, 1));
        }

        if (control.state.get('KeyA')) {
            direction = direction.add(new Vector(-1, 0));
        }

        if (control.state.get('KeyD')) {
            direction = direction.add(new Vector(1, 0));
        }

        this.character.direction = direction.normalize();

        this.updateCharacter(delta);
    }

    private updateCharacter(delta: number) {
        const scene = this.game.scene;

        if (!scene) {
            return;
        }

        let nextFrame = 'idle';

        if (this.isAttacking) {
            if (this.sprite.frame.finished) {
                this.isAttacking = false;
                nextFrame = this.character.direction.empty() ? 'idle' : 'run';
            } else {
                nextFrame = 'attack';
            }
        } else {
            nextFrame = this.character.direction.empty() ? 'idle' : 'run';
        }

        this.sprite.play(nextFrame);

        if (this.character.direction.x < 0) {
            this.sprite.hi = true;
        } else if (this.character.direction.x > 0) {
            this.sprite.hi = false;
        }

        for (const projectile of scene.projectiles) {
            const distance = projectile.position.dist(this.character.position);

            if (distance <= (Math.max(this.character.width, this.character.height))) {
                if (projectile.speed < 2) {
                    projectile.active = false;
                }
                break;
            }
        }

        this.character.update(true);
        this.sprite.update(delta);
    }

    draw(context: CanvasRenderingContext2D) {
        if (this.game.scene?._debug) {
            context.fillStyle = 'red';

            context.beginPath();
            context.ellipse(this.character.position.x, this.character.position.y, this.character.width, this.character.height, Math.PI / 4, 0, 360);
            context.fill();
        }

        this.sprite.draw(
            context,
            this.character.position.x,
            this.character.position.y,
            this.character.width * 3,
            this.character.height * 3
        );
    }

    get ray() {
        const y = this.game.control.y;
        const x = this.game.control.x;
        const direction = new Vector(x, y).sub(this.character.position).normalize();

        return new Ray(this.character.position, direction);
    }
}