import { Line } from "./Line";
import type { Square } from "./Square";
import type { World } from "./World";

export class Renderer {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    frameId: number = -1;
    fps_timestamp: number = -1;
    fps_interval: number;
    world: World;
    updateFn: () => unknown;

    constructor(canvas: HTMLCanvasElement, world: World) {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d', { alpha: false })!;

        const ratio = window.devicePixelRatio;
        const rect = canvas.getBoundingClientRect();

        canvas.width = rect.width * ratio;
        canvas.height = rect.height * ratio;

        this.context.scale(ratio, ratio);

        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;

        this.world = world;
        this.fps_interval = 1000 / 60;
        this.updateFn = () => {};
    }

    tick = () => {
        this.frameId = requestAnimationFrame(this.tick);

        const now = Date.now();
        const elapsed = now - this.fps_timestamp;

        if (elapsed < this.fps_interval) {
            return;
        }

        this.fps_timestamp = now - (elapsed % this.fps_interval);

        this.updateFn();
        this.world.trace();
        this.draw();
    }

    start(updateFn?: () => unknown) {
        this.updateFn = updateFn || this.updateFn;
        this.tick();
    }

    stop() {
        cancelAnimationFrame(this.frameId);
    }

    draw = () => {
        const context = this.context;
        const world = this.world;

        context.fillStyle = '#fff';
        context.fillRect(0, 0, 800, 600);

        for (const entity of world.entities) {
            this.drawEntity(entity);
        }

        context.fillStyle = 'green';
        context.beginPath();
        context.ellipse(world.ray.origin.x, world.ray.origin.y, 10, 10, Math.PI / 4, 0, 360);
        context.fill();

        this.drawTraces(world);
    }

    drawTraces(world: World) {
        if (world.traced.length === 1) {
            return;
        }

        const context = this.context;

        let from = world.traced[0];

        for (let i = 1; i < world.traced.length; i++) {
            const to = world.traced[i];

            context.strokeStyle = 'black';
            context.beginPath();
            context.setLineDash([3, 3]);
            context.moveTo(from.x, from.y);
            context.lineTo(to.x, to.y);
            context.stroke();

            context.fillStyle = i === world.traced.length - 1 ? 'red' : 'blue';
            context.beginPath();
            context.ellipse(to.x, to.y, 6, 6, Math.PI / 4, 0, 360);
            context.fill();

            from = to;
        }
    }

    drawEntity(entity: Line | Square) {
        const context = this.context;

        const points = entity instanceof Line ? [entity.p1, entity.p2] : entity.lines.flatMap(line => [line.p1, line.p2]);

        context.beginPath();
        context.setLineDash([]);
        context.strokeStyle = 'black'
        context.lineWidth = 1;

        context.moveTo(points[0].x, points[0].y);

        for (let i = 1; i < points.length; i++) {
            context.lineTo(points[i].x, points[i].y);
        }

        context.stroke();
    }
}
