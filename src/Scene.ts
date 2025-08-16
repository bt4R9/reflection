import type { Entity } from "./Entity";
import type { Game } from "./Game";
import type { Object2D } from "./Object2D";
import type { Projectile } from "./Projectile";
import type { Rat } from "./Rat";

export class Scene {
    sceneDraw: (context: CanvasRenderingContext2D) => void

    entities: Entity[] = [];
    objects2D: Object2D[] = [];
    projectiles: Projectile[] = [];
    rats: Rat[] = [];

    game?: Game;

    _debug = false;

    constructor(draw: (context: CanvasRenderingContext2D) => void) {
        this.sceneDraw = draw;
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
        // const width = this.game?.renderer.canvas.width ?? 0;
        // const height = this.game?.renderer.canvas.height ?? 0;

        this.sceneDraw(context);

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
            const x = rat.character.position.x;
            const y = rat.character.position.y;
            rat.sprite.draw(context, x, y, 64, 64);
            context.beginPath();
            context.fillStyle = 'red';
            context.rect(x - 10, y - 32, 32, 4);
            context.fill();
            context.closePath();
            context.beginPath();
            context.fillStyle = 'green';
            context.rect(x - 10, y - 32, 32 * (rat.character.hp / 100), 4);
            context.fill();
            context.closePath();
        }

        this.game?.player?.draw(context);

        if (this._debug) {
            for (const entity of this.entities) {
                entity.draw(context);
            }
        }
    }
}