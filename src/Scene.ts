import type { Entity } from "./Entity";
import type { Game } from "./Game";
import type { Object2D } from "./Object2D";
import type { Projectile } from "./Projectile";
import type { Rat } from "./Rat";

export class Scene {
    sceneDraw: (context: CanvasRenderingContext2D) => void

    interactive: boolean;
    entities: Entity[] = [];
    objects2D: Object2D[] = [];
    projectiles: Projectile[] = [];
    rats: Rat[] = [];

    game?: Game;

    _debug = false;

    constructor(draw: (context: CanvasRenderingContext2D) => void, interactive: boolean = true) {
        this.sceneDraw = draw;
        this.interactive = interactive;
    }

    private *gen() {
        for (const entity of this.entities) {
            yield entity;
        }

        for (const object2D of this.objects2D) {
            if (object2D.entity) {
                yield object2D.entity;
            }
        }
    }

    get allEntities() {
        return [...this.gen()];
    }

    update(delta: number) {
        if (!this.interactive) {
            return;
        }

        this.game?.player?.update(delta);

        for (const entity of this.entities) {
            entity.update(delta);
        }

        for (const object2D of this.objects2D) {
            object2D.update(delta)
        }

        for (let i = 0; i < this.projectiles.length; i++) {
            this.projectiles[i].update(delta);

            if (!this.projectiles[i].active) {
                this.projectiles.splice(i, 1);
                i -= 1;
            }
        }

        for (let i = 0; i < this.rats.length; i++) {
            this.rats[i].update(delta);

            if (this.rats[i].character.hp <= 0) {
                this.rats.splice(i, 1);
                i -= 1;
            }
        }
    }

    draw(context: CanvasRenderingContext2D) {
        this.sceneDraw(context);

        if (!this.interactive) {
            return;
        }

        for (const object2D of this.objects2D) {
            object2D.draw(context);

            if (this._debug) {
                object2D.entity?.draw(context);
            }
        }

        for (const projectile of this.projectiles) {
            projectile.sprite.draw(context, projectile.position.x, projectile.position.y, 16, 16);
        }

        for (const rat of this.rats) {
            rat.draw(context);
        }

        this.game?.player?.draw(context);

        if (this._debug) {
            for (const entity of this.entities) {
                entity.draw(context);
            }
        }
    }
}