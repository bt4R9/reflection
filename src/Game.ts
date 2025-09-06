import { Control } from "./Control";
import { Events } from "./Events";
import { Panel } from "./Panel";
import { Player } from "./Player";
import { Renderer } from "./Renderer";
import type { Resource } from "./Resource";
import type { Scene } from "./Scene";
import { getScene0 } from "./scenes/0";
import { getScene1 } from "./scenes/1";
import { getScene2 } from "./scenes/2"
import { getScene3 } from "./scenes/3";
import { getGameOverScene } from "./scenes/gameover";
import { Sound } from "./Sound";
import type { Sprite } from "./Sprite";
import { Vec } from "./Vector";

export class Game {
    scenes: Record<string, Scene> = {};
    resources: Record<string, Resource> = {};
    sprites: Record<string, Sprite> = {};
    emitter = new Events();
    control: Control;
    renderer: Renderer;
    player?: Player;
    sound = new Sound();
    panel?: Panel;
    startTime = 0;
    s = 'intro0';

    sceneOrder: string[] = [
        'intro0',
        'intro1',
        'intro2',
        'level0',
    ];

    constructor(canvas: HTMLCanvasElement) {
        this.renderer = new Renderer(canvas);
        this.control = new Control(canvas, this.emitter);
    }

    load() {
        return Promise.all(Object.values(this.resources).map(r => r.load()));
    }

    get scene() {
        return this.scenes[this.s];
    }

    get order() {
        return this.sceneOrder.indexOf(this.s);
    }

    nextScene() {
        if (this.order === -1) {
            return;
        }

        const nextIndex = this.order + 1;

        if (nextIndex >= this.sceneOrder.length) {
            return;
        }

        this.setScene(this.sceneOrder[nextIndex]);
    }
    

    init() {
        this.player = new Player(new Vec(384, 288), this);
        this.player.init();
        this.control.init();
        this.panel = new Panel(this);

        this.scenes = {
            'intro0': getScene0(this),
            'intro1': getScene1(this),
            'intro2': getScene2(this),

            'level0': getScene3(this),

            'gameover': getGameOverScene(this)
        };

        this.setScene(this.s);

        this.emitter.on('space', () => {
            const scene = this.scene;

            if (!scene) {
                return;
            }

            if (!scene.interactive) {
                this.nextScene();
            }
        });

        return Promise.resolve();
    }

    setScene(scene: string) {
        this.s = scene;
        this.scene.game = this;
        this.renderer.scene = this.scene;

        if (this.scene.interactive) {
            this.startTime = Date.now();
        }

        if (this.s.startsWith('level')) {
            this.sound.playMusic('main');
        }
    }
}