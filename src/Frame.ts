export interface FrameParams {
    width: number,
    height: number,
    gap: number,
    count: number,
    interval: number,
    finite: boolean,
    x: number,
    y: number
}

export class Frame {
    sprite: HTMLImageElement;
    width: number;
    height: number;
    gap: number;
    count: number;
    interval: number;
    finite: boolean;
    x: number;
    y: number;
    timer: number;
    index: number;
    finished: boolean = false;

    constructor(
        sprite: HTMLImageElement,
        params: FrameParams,
    ) {
        this.sprite = sprite;
        this.width = params.width;
        this.height = params.height;
        this.gap = params.gap;
        this.count = params.count;
        this.interval = params.interval;
        this.finite = params.finite;
        this.x = params.x;
        this.y = params.y;

        this.timer = 0;
        this.index = 0;
    }

    reset() {
        this.timer = 0;
        this.index = 0;
    }

    update(delta: number) {
        this.timer += delta;

        if (this.timer < this.interval) {
            return;
        }

        this.timer = 0;
        this.index = this.index + 1;

        if (this.index >= this.count) {
            if (!this.finite) {
                this.index = 0;
            } else {
                this.finished = true;
            }
        }
    }
}