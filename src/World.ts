import { Casting } from "./Casting";
import { Control } from "./Control";
import type { Effect } from "./Effect";
import type { Entity } from "./Entity";
import { Events } from "./Events";
import { Player } from "./Player";
import type { Projectile } from "./Projectile";
import { Ray } from "./Ray";
import { Vector } from "./Vector";

export class World {
    entities: Entity[] = [];
    effects: Effect[] = [];
    projectiles: Projectile[] = [];
    ray: Ray;
    casting: Casting;
    traced: Vector[] = [];
    emitter = new Events();
    player: Player;
    control: Control;

    constructor(canvas: HTMLCanvasElement) {
        this.ray = new Ray(new Vector(400, 300), new Vector(-0.5, -0.9));
        this.casting = new Casting(this);
        this.control = new Control(canvas, this.emitter);
        this.player = new Player(new Vector(400, 300), this);
    }

    add(entity: Entity) {
        this.entities.push(entity);
        return this;
    }

    update(delta: number) {
        for (const entity of this.entities) {
            entity.update();
        }

        for (let i = 0; i < this.effects.length; i++) {
            this.effects[i].update(delta);

            if (this.effects[i].finished) {
                this.effects.splice(i, 1);
                i--;
            }
        }

        for (let i = 0; i < this.projectiles.length; i++) {
            const projectile = this.projectiles[i];
            projectile.update(delta);

            if (!projectile.active) {
                this.projectiles.splice(i, 1);
                i--;
            }
        }

        this.player.update(delta);

        this.trace();
    }

    trace() {
        this.traced = this.casting.cast(this.player.ray);
    }
}
