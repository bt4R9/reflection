import { Bullet } from "./Bullet";
import { Ray } from "./Ray";
import { Vector } from "./Vector";
import type { World } from "./World";

export class Player {
    position: Vector;
    velocity: Vector;
    speed: number;
    world: World;
    bullets: Bullet[] = [];

    constructor(position: Vector, speed: number, world: World) {
        this.position = position;
        this.velocity = new Vector(0, 0);
        this.speed = speed;
        this.world = world;
    }

    fire = () => {
        this.bullets.push(new Bullet(this.position, this.ray.direction, this.world));
    }

    subscribe() {
        this.world.emitter.on('mousedown', this.fire);
    }

    unsubscribe() {
        this.world.emitter.off('mousedown', this.fire);
    }

    get ray() {
        const y = this.world.control.y;
        const x = this.world.control.x;
        const direction = new Vector(x, y).sub(this.position).normalize();

        return new Ray(this.position, direction);
    }

    move(direction: Vector) {
        this.velocity = direction.normalize().scale(this.speed);

        if (this.speed !== 0) {
            this.position = this.position.add(this.velocity);
        }
    }

    update() {
        const control = this.world.control;
        this.speed = 0;

        if (control.state.get("w")) {
            this.speed = 1;
            this.move(new Vector(0, -1));
        }

        if (control.state.get("s")) {
            this.speed = 1;
            this.move(new Vector(0, 1));
        }
        
        if (control.state.get("a")) {
            this.speed = 1;
            this.move(new Vector(-1, 0));
        }
        
        if (control.state.get("d")) {
            this.speed = 1;
            this.move(new Vector(1, 0));
        }

        for (let i = 0; i < this.bullets.length; i++) {
            const bullet = this.bullets[i];
            bullet.update();

            if (!bullet.active) {
                this.bullets.splice(i, 1);
                i--;
            }
        }
    }
}