import { Effect } from "./Effect";
import { Ray } from "./Ray";
import { Sprite } from "./Sprite";
import type { Vector } from "./Vector";
import type { World } from "./World";

export class Projectile {
    position: Vector;
    direction: Vector;
    world: World;
    speed: number = 2.5;
    active: boolean = true;

    sprite: Sprite;

    bounce: number = 0;
    private maxBounces: number = 2;

    constructor(position: Vector, direction: Vector, world: World) {
        this.position = position;
        this.direction = direction;
        this.world = world;

        this.sprite = new Sprite('public/moving.png', 50, 50, {
            run: { width: 50, height: 50, gap: 0, count: 4, interval: 250, finite: false, x: 0, y: 0 }
        });

        this.sprite.play('run');
        this.sprite.rotate(direction);
    }

    update(delta: number) {
        if (this.bounce >= this.maxBounces) {
            this.active = false;
            this.world.effects.push(new Effect(this.position));
            return false;
        }

        this.position = this.position.add(this.direction.scale(this.speed));
        this.sprite.update(delta);

        for (const entity of this.world.entities) {
            for (const line of entity.lines) {
                if (line.intersect(this.position)) {
                    this.bounce++;

                    const ray = new Ray(this.position, this.direction);
                    const intersection = ray.intersect(line);

                    if (intersection) {
                        const lineDir = line.p2.sub(line.p1).normalize();
                        let normal = lineDir.perpendicular().normalize();

                        if (normal.dot(ray.direction) > 0) {
                            normal = normal.negate();
                        }

                        const reflectedDir = ray.reflect(normal);

                        this.direction = reflectedDir;

                        this.sprite.rotate(this.direction);
                    }

                    break;
                }
            }
        }

        return true;
    }
}