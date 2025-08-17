import { Control } from "./Control";
import { Events } from "./Events";
import { Player } from "./Player";
import { Renderer } from "./Renderer";
import type { Resource } from "./Resource";
import type { Scene } from "./Scene";
import { getScene0 } from "./scenes/0";
import { getScene1 } from "./scenes/1";
import { getScene2 } from "./scenes/2";
import type { Sprite } from "./Sprite";
import { Vector } from "./Vector";

export class Game {
    scenes: Scene[] = [];
    resources: Record<string, Resource> = {};
    sprites: Record<string, Sprite> = {};
    emitter = new Events();
    control: Control;
    renderer: Renderer;
    player?: Player;
    s = 0;

    constructor(canvas: HTMLCanvasElement) {
        this.renderer = new Renderer(canvas);
        this.control = new Control(canvas, this.emitter);
    }

    load() {
        return Promise.all(Object.values(this.resources).map(r => r.load()));
    }

    get scene() {
        const scene = this.scenes[this.s];

        if (!scene) {
            throw new Error();
        }

        return scene;
    }
    

    init() {
        this.player = new Player(new Vector(300, 300), this);
        this.player.init();
        this.control.init();

        this.scenes = [
            getScene0(this),
            getScene1(this),
            getScene2(this),
        ];

        this.setScene(this.s);

        this.emitter.on('space', () => {
            const scene = this.scene;

            if (!scene) {
                return;
            }

            if (!scene.interactive) {
                this.setScene(this.s + 1);
            }
        });

        return Promise.resolve();
    }

    setScene(scene: number) {
        this.s = scene;
        this.scene.game = this;
        this.renderer.scene = this.scene;
    }
}