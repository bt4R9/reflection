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

        this.context.imageSmoothingEnabled = false;

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
        this.world.update(elapsed);
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

        context.fillStyle = '#000';
        context.fillRect(0, 0, 800, 600);

        for (const entity of world.entities) {
            this.drawEntity(entity);
        }

        if (false && this.tracking) {
            this.drawTraces(world);
        }

        this.drawPlayer(world);
        this.drawProjectiles(world);
        this.drawEffects(world);
    }

    drawEffects(world: World) {
        const context = this.context;

        for (const effect of world.effects) {
            effect.sprite.draw(context, effect.position.x, effect.position.y);
        }
    }

    drawPlayer(world: World) {
        const context = this.context;
        const sprite = world.player.character.sprite;

        if (!sprite) {
            return;
        }

        if (sprite.loaded) {
            const position = world.player.character.position;
            sprite.draw(context, position.x, position.y);

            // context.fillStyle = 'red';
            // context.beginPath();
            // context.ellipse(position.x, position.y, 20, 20, Math.PI / 4, 0, 360);
            // context.fill();
        }
    }

    drawProjectiles(world: World) {
        const context = this.context;

        for (const projectile of world.projectiles) {
            projectile.sprite.draw(context, projectile.position.x, projectile.position.y);
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
        context.strokeStyle = '#fff'
        context.lineWidth = 1;

        context.moveTo(points[0].x, points[0].y);

        for (let i = 1; i < points.length; i++) {
            context.lineTo(points[i].x, points[i].y);
        }

        context.stroke();
    }
}
