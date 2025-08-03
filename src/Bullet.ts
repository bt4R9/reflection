import { Effect } from "./Effect";
import { Ray } from "./Ray";
import type { Vector } from "./Vector";
import type { World } from "./World";

export class Bullet {
    position: Vector;
    direction: Vector;
    speed: number = 2.5;
    active: boolean = true;

    world: World;

    bounce: number = 0;
    private maxBounces: number = 5;

    constructor(position: Vector, direction: Vector, world: World) {
        this.position = position;
        this.direction = direction;
        this.world = world;
    }

    update() {
        if (this.bounce >= this.maxBounces) {
            this.active = false;
            this.world.effects.push(new Effect(this.position, 3, 100, 3000));
            return false;
        }

        this.position = this.position.add(this.direction.scale(this.speed));

        for (const entity of this.world.entities) {
            for (const line of entity.lines) {
                if (line.intersect(this.position)) {
                    this.bounce++;
                    this.speed *= 0.95; // Reduce speed on bounce
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
                    }

                    break;
                }
            }
        }

        return true;
    }
}