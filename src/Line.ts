import { Vector } from "./Vector";

export class Line {
    p1: Vector;
    p2: Vector;

    constructor(p1: Vector, p2: Vector) {
        this.p1 = p1;
        this.p2 = p2;   
    }

    get center(): Vector {
        return new Vector(
            (this.p1.x + this.p2.x) / 2,
            (this.p1.y + this.p2.y) / 2
        );
    }

    get radius(): number {
        return this.p1.sub(this.p2).length() / 2;
    }

    intersect(vector: Vector, tolerance = 4): boolean {
        const a = this.p1;
        const b = this.p2;
        const ab = b.sub(a);
        const ap = vector.sub(a);

        const abLengthSquared = ab.dot(ab);
        if (abLengthSquared === 0) {
            return vector.sub(a).length() <= tolerance;
        }

        const t = ap.dot(ab) / abLengthSquared;

        const tClamped = Math.max(0, Math.min(1, t));

        const closest = a.add(ab.scale(tClamped));

        const dist = vector.sub(closest).length();

        return dist <= tolerance;
    }
}