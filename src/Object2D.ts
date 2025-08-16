import { Entity } from "./Entity";
import type { Sprite } from "./Sprite";
import { Vector } from "./Vector";

export class Object2D {
    position: Vector;
    width: number;
    height: number;
    entity?: Entity;
    sprite: Sprite;
    frame: string;
    finite: boolean;

    hb: boolean;
    hi: boolean;
    vi: boolean;

    constructor(
        position: [number, number],
        width: number,
        height: number,
        sprite: Sprite,
        frame: string,
        params: {
            hb?: boolean,
            hi?: boolean,
            vi?: boolean,
        } = {}
    ) {
        this.position = new Vector(position[0], position[1]);
        this.sprite = sprite;
        this.width = width;
        this.height = height;
        this.frame = frame;
        this.hb = params.hb ?? true;
        this.hi = params.hi ?? false;
        this.vi = params.vi ?? false;
        this.finite = this.sprite.frame.finite;

        if (this.hb) {
            const hw = (width / 2) | 0;
            const hh = (height / 2) | 0;
            this.entity = Entity.polygon(this.position, [[-hw, -hh], [hw, -hh], [hw, hh], [-hw, hh]], 'red');
        }
    }

    update(delta: number) {
        if (!this.finite) {
            this.sprite.update(delta);
        }
    }

    draw(context: CanvasRenderingContext2D) {
        this.sprite.hi = this.hi;
        this.sprite.vi = this.vi;
        this.sprite.play(this.frame);
        this.sprite.draw(context, this.position.x, this.position.y, this.width, this.height);
    }
}
