import { Casting } from "./Casting";
import { Control } from "./Control";
import type { Effect } from "./Effect";
import type { Entity } from "./Entity";
import { Events } from "./Events";
import { Player } from "./Player";
import { Ray } from "./Ray";
import { Vector } from "./Vector";

export class World {
    entities: Entity[] = [];
    effects: Effect[] = [];
    ray: Ray;
    casting: Casting;
    traced: Vector[] = [];
    limit: number;
    emitter = new Events();
    player: Player;
    control: Control;

    constructor(canvas: HTMLCanvasElement) {
        this.entities = [];
        this.effects = [];

        this.ray = new Ray(new Vector(400, 300), new Vector(-0.5, -0.9));
        this.casting = new Casting(this);
        this.limit = 5;
        this.control = new Control(canvas, this.emitter);
        this.player = new Player(new Vector(400, 300), 2, this);
    }

    add(entity: Entity) {
        this.entities.push(entity);
        return this;
    }

    update() {
        for (const entity of this.entities) {
            entity.update();
        }

        for (let i = 0; i < this.effects.length; i++) {
            this.effects[i].update();

            if (this.effects[i].value >= this.effects[i].end) {
                this.effects.splice(i, 1);
                i--; // Adjust index after removal
            }
        }

        this.player.update();

        this.trace();
    }

    trace() {
        this.traced = this.casting.cast(this.player.ray, this.limit);
    }
}
