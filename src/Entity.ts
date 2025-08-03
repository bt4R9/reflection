import { Line } from "./Line";
import { Vector } from "./Vector";

export class Entity {
    lines: Line[] = [];

    private _center?: Vector;
    private _radius?: number;

    velocity: Vector;
    speed: number;
    rotation: number;

    constructor(lines: Line[], center?: Vector) {
        this.lines = lines;
        this._center = center;

        this.velocity = new Vector(0, 0);
        this.speed = 0;
        this.rotation = 0;
    }

    get center(): Vector {
        if (this._center) {
            return this._center;
        }

        const x = this.lines.reduce((sum, line) => sum + (line.p1.x + line.p2.x) / 2, 0) / this.lines.length;
        const y = this.lines.reduce((sum, line) => sum + (line.p1.y + line.p2.y) / 2, 0) / this.lines.length;

        this._center = new Vector(x, y);

        return this._center;
    }

    get radius(): number {
        if (this._radius) {
            return this._radius;
        }

        this._radius = this.lines.reduce((max, line) => {
            const p1 = line.p1;
            const p2 = line.p2;
            const dist1 = p1.sub(this.center).length();
            const dist2 = p2.sub(this.center).length();
            return Math.max(max, dist1, dist2);
        }, 0);

        return this._radius;
    }

    static line(p1: Vector, p2: Vector): Entity {
        return new Entity([new Line(p1, p2)]);
    }

    static square(center: Vector, size: number): Entity {
        const halfSize = (size / 2) | 0;

        const lines = [
            new Line(new Vector(center.x - halfSize, center.y - halfSize), new Vector(center.x + halfSize, center.y - halfSize)),
            new Line(new Vector(center.x + halfSize, center.y - halfSize), new Vector(center.x + halfSize, center.y + halfSize)),
            new Line(new Vector(center.x + halfSize, center.y + halfSize), new Vector(center.x - halfSize, center.y + halfSize)),
            new Line(new Vector(center.x - halfSize, center.y + halfSize), new Vector(center.x - halfSize, center.y - halfSize)),
        ];

        return new Entity(lines, center);
    }

    private rotate(angle: number) {
        const center = this.center;

        for (const line of this.lines) {
            line.p1 = line.p1.sub(center).rotate(angle).add(center);
            line.p2 = line.p2.sub(center).rotate(angle).add(center);
        }

        return this;
    }

    private move(offset: Vector) {
        for (const line of this.lines) {
            line.p1 = line.p1.add(offset);
            line.p2 = line.p2.add(offset);
        }

        if (this._center) {
            this._center = this._center.add(offset);
        }

        return this;
    }

    static polygon(sides: Vector[]): Entity {
        const lines: Line[] = [];

        const first = sides[0];
        const last = sides[sides.length - 1];

        for (let i = 1; i < sides.length - 1; i++) {
            lines.push(new Line(sides[i - 1], sides[i]));
        }

        lines.push(new Line(last, first));

        return new Entity(lines);
    }

    update() {
        if (this.velocity.length() > 0) {
            this.move(this.velocity.scale(this.speed));
        }

        if (this.rotation !== 0) {
            this.rotate(this.rotation);
        }
    }
}