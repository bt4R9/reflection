export class Vector {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    equal(v: Vector) {
        return this.x === v.x && this.y === v.y;
    }
    add(v: Vector) {
        return new Vector(this.x + v.x, this.y + v.y);
    }
    sub(v: Vector) {
        return new Vector(this.x - v.x, this.y - v.y);
    }
    dot(v: Vector) {
        return this.x * v.x + this.y * v.y;
    }
    cross(v: Vector) {
        return this.x * v.y - this.y * v.x;
    }
    scale(s: number) {
        return new Vector(this.x * s, this.y * s);
    }
    length() {
        return Math.hypot(this.x, this.y);
    }
    normalize() {
        const len = this.length();
        return len === 0 ? new Vector(0, 0) : this.scale(1 / len);
    }
    perpendicular() {
        return new Vector(-this.y, this.x);
    }
    negate() {
        return new Vector(-this.x, -this.y);
    }
    clone() {
        return new Vector(this.x, this.y);
    }
    rotate(angle: number) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        return new Vector(
            this.x * cos - this.y * sin,
            this.x * sin + this.y * cos
        );
    }
}