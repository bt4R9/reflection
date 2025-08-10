import { Character } from "./Character";
import { Projectile } from "./Projectile";
import { Ray } from "./Ray";
import { Sprite } from "./Sprite";
import { Vector } from "./Vector";
import type { World } from "./World";

export class Player {
    character: Character;
    world: World;

    constructor(position: Vector, world: World) {
        this.character = new Character({
            position,
            width: 64,
            height: 64,
            speed: 2,
            sprite: new Sprite(
                'public/mage.png',
                48,
                64,
                {
                    idle: { width: 64, height: 64, gap: 76, count: 10, interval: 250, finite: false, x: 0, y: 0 },
                    run: { width: 64, height: 64, gap: 76, count: 8, interval: 100, finite: false, x: 0, y: 80 },
                }
            ),
        });

        this.world = world;
        this.updateCharacter(0);
    }

    fire = () => {
        this.world.projectiles.push(new Projectile(this.character.position, this.ray.direction, this.world));
    }

    init() {
        this.world.emitter.on('mousedown', this.fire);
    }

    dispose() {
        this.world.emitter.off('mousedown', this.fire);
    }

    update(delta: number) {
        const control = this.world.control;
        let direction = new Vector(0, 0);

        this.character.speed = 0;

        if (control.state.get('w')) {
            this.character.speed = 1;
            direction = direction.add(new Vector(0, -1));
        }

        if (control.state.get('s')) {
            this.character.speed = 1;
            direction = direction.add(new Vector(0, 1));
        }

        if (control.state.get('a')) {
            this.character.speed = 1;
            direction = direction.add(new Vector(-1, 0));
        }

        if (control.state.get('d')) {
            this.character.speed = 1;
            direction = direction.add(new Vector(1, 0));
        }

        this.character.velocity = direction.normalize();

        this.updateCharacter(delta);
    }

    private updateCharacter(delta: number) {
        const nextFrame = this.character.speed > 0 ? 'run' : 'idle';
        const sprite = this.character.sprite;

        if (!sprite) {
            return;
        }

        if (this.character.velocity.x < 0) {
            this.character.sprite!.hotizontalInverse = true;
        } else if (this.character.velocity.x > 0) {
            this.character.sprite!.hotizontalInverse = false;
        }

        sprite.play(nextFrame);

        if (this.character.velocity.x < 0) {
            sprite.hotizontalInverse = true;
        } else if (this.character.velocity.x > 0) {
            sprite.hotizontalInverse = false;
        }

        this.character.update();
        this.character.move();

        sprite.update(delta);
    }

    get ray() {
        const y = this.world.control.y;
        const x = this.world.control.x;
        const direction = new Vector(x, y).sub(this.character.position).normalize();

        return new Ray(this.character.position, direction);
    }
}