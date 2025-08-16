import { Control } from "./Control";
import { Events } from "./Events";
import { Player } from "./Player";
import { Renderer } from "./Renderer";
import type { Resource } from "./Resource";
import type { Scene } from "./Scene";
import type { Sprite } from "./Sprite";
import { Vector } from "./Vector";

export class Game {
    resources: Record<string, Resource> = {};
    sprites: Record<string, Sprite> = {};
    emitter = new Events();
    control: Control;
    renderer: Renderer;
    player?: Player;
    scene?: Scene;

    constructor(canvas: HTMLCanvasElement) {
        this.renderer = new Renderer(canvas);
        this.control = new Control(canvas, this.emitter);
    }

    load() {
        return Promise.all(Object.values(this.resources).map(r => r.load()));
    }

    init() {
        this.player = new Player(new Vector(300, 300), this);
        this.player.init();
        this.control.init();

        return Promise.resolve();
    }

    setScene(scene: Scene) {
        this.scene = scene;
        this.scene.game = this;
        this.renderer.scene = this.scene;
    }
}