export interface FrameParams {
    width: number;
    height: number;
    gap?: number;
    count?: number;
    interval?: number;
    finite?: boolean;
    sx: number;
    sy: number;
}

export class Frame {
    gap: number;
    count: number;
    interval: number;
    finite: boolean;
    sx: number;
    sy: number;
    width: number;
    height: number;
    timer: number;
    index: number;
    finished: boolean = false;

    constructor(
        params: FrameParams,
    ) {
        this.gap = params.gap ?? 0;
        this.count = params.count ?? 1;
        this.interval = params.interval ?? Infinity;
        this.finite = params.finite ?? this.count === 1;
        this.sx = params.sx;
        this.sy = params.sy;
        this.width = params.width;
        this.height = params.height;

        this.timer = 0;
        this.index = 0;
    }

    get x() {
        return this.sx + this.index * (this.width + this.gap);
    }

    get y() {
        return this.sy;
    }

    reset() {
        this.timer = 0;
        this.index = 0;
        this.finished = false;
    }

    update(delta: number) {
        this.timer += delta;

        if (this.timer < this.interval || this.finished) {
            return;
        }

        this.timer = 0;
        this.index = this.index + 1;

        if (this.index >= this.count) {
            if (!this.finite) {
                this.index = 0;
            } else {
                this.index = this.count - 1;
                this.finished = true;
            }
        }
    }
}