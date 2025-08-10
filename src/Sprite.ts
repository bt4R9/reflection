import { Frame, type FrameParams } from "./Frame";
import type { Vector } from "./Vector";

export type FrameType = 'idle' | 'run' | 'attack' | 'jump' | 'hit' | 'death';

export class Sprite {
    loaded: boolean = false;
    source: string;
    sprite: HTMLImageElement;
    frames: { [P in FrameType]?: Frame };

    width: number;
    height: number;
    localCanvas: HTMLCanvasElement;
    localContext: CanvasRenderingContext2D;

    type: FrameType = 'idle';
    hotizontalInverse: boolean = false;

    rotation: number = 0;
    frame?: Frame;

    constructor(
        source: string,
        width: number,
        height: number,
        frames: { [P in FrameType]?: FrameParams },
    ) {
        this.source = source;
        this.width = width;
        this.height = height;
        this.sprite = new Image();

        this.frames = {};

        for (const [key, params] of Object.entries(frames)) {
            this.frames[key as FrameType] = new Frame(this.sprite, params);
        }

        this.localCanvas = document.createElement('canvas');
        this.localCanvas.width = this.width;
        this.localCanvas.height = this.height;
        this.localContext = this.localCanvas.getContext('2d')!;
        this.localContext.imageSmoothingEnabled = false;

        this.frame = this.frames[this.type];

        this.load();
    }

    private load(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.sprite.onload = () => {
                this.loaded = true;
                resolve();
            };
            this.sprite.onerror = (error) => {
                this.loaded = false;
                reject(error);
            };
            this.sprite.src = this.source;
        });
    }

    play(nextType: FrameType) {
        if (nextType !== this.type) {
            this.type = nextType;
            this.frame = this.frames[nextType];
            this.frame?.reset();
        }
    }

    update(delta: number) {
        this.frame?.update(delta);
    }

    rotate(vector: Vector) {
        this.rotation = Math.atan2(vector.y, vector.x);
    }

    draw(globalContext: CanvasRenderingContext2D, globalX: number, globalY: number) {
        if (!this.frame) {
            return;
        }

        const localContext = this.localContext;

        const sourceX = this.frame.x + this.frame.index * (this.frame.width + this.frame.gap);
        const sourceY = this.frame.y;

        localContext.clearRect(0, 0, this.width, this.height);
        localContext.save();
        localContext.translate(this.width / 2, this.height / 2);
        localContext.rotate(this.rotation);

        if (this.hotizontalInverse) {
            localContext.scale(-1, 1);
        }

        localContext.drawImage(
            this.sprite,
            sourceX, sourceY,
            this.frame.width, this.frame.height,
            -this.frame.width / 2, -this.frame.height / 2,
            this.frame.width, this.frame.height
        );

        localContext.restore();

        globalContext.drawImage(
            this.localCanvas,
            (globalX - this.width / 2) | 0,
            (globalY - this.height / 2) | 0
        );
    }
}