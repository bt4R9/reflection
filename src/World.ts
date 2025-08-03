import { Casting } from "./Casting";
import type { Line } from "./Line";
import { Ray } from "./Ray";
import type { Square } from "./Square";
import { Vector } from "./Vector";

export class World {
    entities: (Line | Square)[] = [];
    ray: Ray;
    casting: Casting;
    traced: Vector[] = [];
    limit: number;

    constructor() {
        this.entities = [];
        this.ray = new Ray(new Vector(400, 300), new Vector(-0.5, -0.9));
        this.casting = new Casting(this);
        this.limit = 5;
    }

    add(entity: Line | Square) {
        this.entities.push(entity);
        return this;
    }

    trace() {
        this.traced = this.casting.cast(this.ray, this.limit);
    }
}
