import { Line } from "./Line";
import { Vector } from "./Vector";

export class Square {
    lines: Line[];
    center: Vector;

    constructor(center: Vector, size: number) {
        const halfSize = (size / 2) | 0;

        this.center = center;

        this.lines = [
            new Line(new Vector(center.x - halfSize, center.y - halfSize), new Vector(center.x + halfSize, center.y - halfSize)),
            new Line(new Vector(center.x + halfSize, center.y - halfSize), new Vector(center.x + halfSize, center.y + halfSize)),
            new Line(new Vector(center.x + halfSize, center.y + halfSize), new Vector(center.x - halfSize, center.y + halfSize)),
            new Line(new Vector(center.x - halfSize, center.y + halfSize), new Vector(center.x - halfSize, center.y - halfSize)),
        ];
    }

    rotate(angle: number) {
        const center = this.center;

        for (const line of this.lines) {
            line.p1 = line.p1.sub(center).rotate(angle).add(center);
            line.p2 = line.p2.sub(center).rotate(angle).add(center);
        }

        return this;
    }
}