import type { Events } from "./Events";

export class Control {
    private canvas: HTMLCanvasElement;
    private emitter: Events;

    state: Map<string, boolean> = new Map();
    x: number = 0;
    y: number = 0;

    constructor(canvas: HTMLCanvasElement, emitter: Events) {
        this.canvas = canvas;
        this.emitter = emitter;
    }

    onKeyDown = (event: KeyboardEvent) => {
        this.state.set(event.key, true);
        if (event.key === ' ') {
            this.emitter.emit('space');
        }
    }

    onKeyUp = (event: KeyboardEvent) => {
        this.state.set(event.key, false);
    }

    onMouseMove = (e: MouseEvent) => {
        const rect = this.canvas.getBoundingClientRect();

        this.x = e.clientX - rect.left;
        this.y = e.clientY - rect.top;
    }

    onMouseDown = () => {
        this.emitter.emit('mousedown');
    }

    init() {
        window.addEventListener('keydown', this.onKeyDown);
        window.addEventListener('keyup', this.onKeyUp);
        window.addEventListener('mousedown', this.onMouseDown);

        this.canvas.addEventListener('mousemove', this.onMouseMove);
    }

    dispose() {
        window.removeEventListener('keydown', this.onKeyDown);
        window.removeEventListener('keyup', this.onKeyUp);
        window.addEventListener('mousedown', this.onMouseDown);

        this.canvas.removeEventListener('mousemove', this.onMouseMove);
    }
}