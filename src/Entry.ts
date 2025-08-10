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
        this.world.control.init();
        this.world.player.init();
        this.renderer.start();
    }

    stop() {
        this.world.control.dispose();
        this.world.player.dispose();
        this.renderer.stop();
    }
}