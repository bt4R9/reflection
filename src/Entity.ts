import { Vector } from "./Vector";

export class Entity {
    position: Vector;
    vectors: Vector[];
    color: string;

    constructor(position: Vector, vectors: Vector[], params: {
        color: string
    } = {
        color: '#000'
    }) {
        this.position = position;
        this.vectors = vectors;
        this.color = params.color;
    }

    static line(position: Vector, p1: Vector, p2: Vector) {
        return new Entity(position, [p1, p2]);
    }

    static square(position: Vector, size: number) {
        const halfSize = (size / 2) | 0;

        return new Entity(position, [
            new Vector(-halfSize, -halfSize),
            new Vector(halfSize, -halfSize),
            new Vector(halfSize, halfSize),
            new Vector(-halfSize, halfSize)
        ]);
    }

    static polygon(position: Vector, points: [number, number][], color: string = '#fff') {
        return new Entity(position, points.map(([x, y]) => new Vector(x, y)), {color});
    }

    private *gen(): Generator<[Vector, Vector], void, unknown> {
        for (let i = 1; i < this.vectors.length; i++) {
            yield [
                this.vectors[i - 1].add(this.position),
                this.vectors[i].add(this.position)
            ];
        }

        yield [
            this.vectors[this.vectors.length - 1].add(this.position),
            this.vectors[0].add(this.position)
        ];
    } 

    get lines() {
        return [...this.gen()];
    }

    rotate(vector: Vector) {
        const angle = Math.atan2(vector.y, vector.x);

        for (let i = 0; i < this.vectors.length; i++) {
            this.vectors[i] = this.vectors[i].rotate(angle);
        }
    }

    move(vector: Vector) {
        this.position = this.position.add(vector);
    }

    static lineIntersect(vector: Vector, line: [Vector, Vector], tolerance: number): boolean {
        const [a, b] = line;
        const ab = b.sub(a);
        const ap = vector.sub(a);
        const abLengthSquared = ab.dot(ab);

        if (abLengthSquared === 0) {
            return vector.sub(a).length() <= tolerance;
        }

        const t = ap.dot(ab) / abLengthSquared;
        const clamped = Math.max(0, Math.min(1, t));
        const closest = a.add(ab.scale(clamped));
        const dist = vector.sub(closest).length();

        return dist <= tolerance;
    }

    intersect(vector: Vector, tolerance = 0): [Vector, Vector] | null {
        for (const line of this.lines) {
            if (Entity.lineIntersect(vector, line, tolerance)) {
                return line;
            }
        }

        return null;
    }

    draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.setLineDash([]);
        context.strokeStyle = this.color;
        context.lineWidth = 1;

        const first = this.vectors[0].add(this.position);

        context.moveTo(first.x, first.y);

        for (let i = 0; i < this.vectors.length; i++) {
            const vector = this.vectors[i].add(this.position);
            context.lineTo(vector.x, vector.y);
        }

        context.lineTo(first.x, first.y);
        context.stroke();
    }

    update(_delta: number) {}
}