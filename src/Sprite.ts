import { Frame, type FrameParams } from "./Frame";
import type { Resource } from "./Resource";
import { Vector } from "./Vector";

export class Sprite {
    resource: Resource;
    frames: Record<string, Frame>;
    localCanvas: HTMLCanvasElement;
    localContext: CanvasRenderingContext2D;
    hi: boolean = false;
    vi: boolean = false;
    rotation: number = 0;
    type: string;
    frame: Frame;

    constructor(
        resource: Resource,
        frames: Record<string, FrameParams>,
    ) {
        this.resource = resource;
        this.frames = {};

        for (const [key, params] of Object.entries(frames)) {
            this.frames[key] = new Frame(params);
        }

        const key = Object.keys(frames)[0];

        this.type = key;
        this.frame = this.frames[key];

        this.localCanvas = document.createElement('canvas');
        this.localCanvas.width = this.frame.width;
        this.localCanvas.height  = this.frame.height;
        this.localContext = this.localCanvas.getContext('2d')!;
        this.localContext.imageSmoothingEnabled = false;
    }

    play(nextType: string) {
        if (nextType !== this.type) {
            this.type = nextType;
            this.frame = this.frames[nextType];
            this.frame.reset();
        }
    }

    update(delta: number) {
        this.frame.update(delta);
    }

    rotate(vector: Vector) {
        this.rotation = Math.atan2(vector.y, vector.x);
    }

    draw(globalContext: CanvasRenderingContext2D, globalX: number, globalY: number, w?: number, h?: number) {
        if (!this.frame) {
            return;
        }

        const frame = this.frame;

        const width = w ?? frame.width;
        const height = h ?? frame.height;

        this.localCanvas.width = width;
        this.localCanvas.height = height;

        const localContext = this.localContext;

        localContext.imageSmoothingEnabled = false;
        localContext.clearRect(0, 0, width, height);
        localContext.save();
        localContext.translate(width / 2 | 0, height / 2 | 0);
        localContext.rotate(this.rotation);

        if (this.hi && this.vi) {
            localContext.scale(-1, -1);
        } else if (this.hi) {
            localContext.scale(-1, 1);
        } else if (this.vi) {
            localContext.scale(1, -1);
        }

        localContext.drawImage(
            this.resource.img,
            frame.x, frame.y,
            frame.width, frame.height,
            -width / 2 | 0, -height / 2 | 0,
            width, height
        );

        localContext.restore();

        globalContext.drawImage(
            this.localCanvas,
            (globalX - width / 2) | 0,
            (globalY - height / 2) | 0
        );
    }
}