import { Renderer } from "./Renderer";
import { World } from "./World";

export class Entry {
    renderer: Renderer;
    world: World;

    constructor(canvas: HTMLCanvasElement) {
        this.world = new World(canvas);
        this.renderer = new Renderer(canvas, this.world);
    }

    start() {
        this.world.control.subscribe();
        this.world.player.subscribe();
        this.renderer.start();
    }

    stop() {
        this.world.control.unsubscribe();
        this.world.player.unsubscribe();
        this.renderer.stop();
    }
}