import type { Line } from "./Line";
import type { Vector } from "./Vector";

export class Ray {
    origin: Vector;
    direction: Vector;

    constructor(origin: Vector, direction: Vector) {
        this.origin = origin;
        this.direction = direction.normalize();
    }

    intersect(line: Line): Vector | null {
        const p = this.origin;
        const r = this.direction;
        const a = line.p1;
        const b = line.p2;
        const s = b.sub(a);

        const rxs = r.cross(s);

        if (rxs === 0) {
            return null;
        }

        const q_p = a.sub(p);
        const t = q_p.cross(s) / rxs;
        const u = q_p.cross(r) / rxs;

        if (t >= 0 && u >= 0 && u <= 1) {
            return p.add(r.scale(t));
        }

        return null;
    }

    reflect(normal: Vector): Vector {
        const dot = this.direction.dot(normal);
        return this.direction.sub(normal.scale(2 * dot)).normalize();
    }
}