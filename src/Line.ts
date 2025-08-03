import type { Vector } from "./Vector";

export class Line {
    p1: Vector;
    p2: Vector;

    constructor(p1: Vector, p2: Vector) {
        this.p1 = p1;
        this.p2 = p2;   
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