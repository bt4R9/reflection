import type { Entity } from "./Entity";
import type { World } from "./World";

export class Renderer {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    frameId: number = -1;
    fps_timestamp: number = -1;
    fps_interval: number;
    world: World;
    tracking = true;

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
    }

    tick = () => {
        this.frameId = requestAnimationFrame(this.tick);

        const now = Date.now();
        const elapsed = now - this.fps_timestamp;

        if (elapsed < this.fps_interval) {
            return;
        }

        this.fps_timestamp = now - (elapsed % this.fps_interval);
        this.world.update();
        this.draw();
    }

    start() {
        this.tick();

        this.world.emitter.on('space', () => {
            this.tracking = !this.tracking;
        });
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
        context.ellipse(world.player.position.x, world.player.position.y, 10, 10, Math.PI / 4, 0, 360);
        context.fill();

        if (this.tracking) {
            this.drawTraces(world);
        }

        this.drawPlayer(world);
        this.drawEffects(world);
    }

    drawEffects(world: World) {
        const context = this.context;

        for (const effect of world.effects) {
            context.fillStyle = 'red';
            context.beginPath();
            context.ellipse(effect.position.x, effect.position.y, effect.value, effect.value, Math.PI / 4, 0, 360);
            context.fill();
        }
    }

    drawPlayer(world: World) {
        const context = this.context;

        const bullets = world.player.bullets;

        for (const bullet of bullets) {
            const factor = 1 - (bullet.bounce / 10);

            const r = parseInt('#ff0000'.slice(1, 3), 16);
            const g = parseInt('ff0000'.slice(3, 5), 16);
            const b = parseInt('ff0000'.slice(5, 7), 16);
            const r2 = Math.round(r * factor);
            const g2 = Math.round(g * factor);
            const b2 = Math.round(b * factor);
            context.fillStyle = `#${r2.toString(16).padStart(2, '0')}${g2.toString(16).padStart(2, '0')}${b2.toString(16).padStart(2, '0')}`;
            context.beginPath();
            context.ellipse(bullet.position.x, bullet.position.y, 4, 4, Math.PI / 4, 0, 360);
            context.fill();
        }
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

    drawEntity(entity: Entity) {
        const context = this.context;

        const points = entity.lines.flatMap(line => [line.p1, line.p2]);

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
