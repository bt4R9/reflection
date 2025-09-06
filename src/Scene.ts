import type { Entity } from "./Entity";
import type { Game } from "./Game";
import type { O2D } from "./Object2D";
import type { Projectile } from "./Projectile";
import type { Rat } from "./Rat";

export class Scene {
    sceneDraw: (context: CanvasRenderingContext2D) => void

    interactive: boolean;
    entities: Entity[] = [];
    objects2D: O2D[] = [];
    projectiles: Projectile[] = [];
    rats: Rat[] = [];
    gameTime: number = 0;
    timeLeft: number = 0;

    game?: Game;

    _debug = false;

    constructor(
        draw: (context: CanvasRenderingContext2D) => void,
        interactive: boolean = true,
        gameTime: number = 0,
    ) {
        this.sceneDraw = draw;
        this.gameTime = gameTime;
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

        this.timeLeft = (this.game?.scene.gameTime ?? 0) - (Date.now() - (this.game?.startTime ?? 0));

        if (this.timeLeft <= 0) {
            this.game?.setScene('gameover');
            this.game?.sound.stopMusic();
            return;
        }

        this.game?.player?.update(delta);

        for (const entity of this.entities) {
            entity.update(delta);
        }

        for (const object2D of this.objects2D) {
            object2D.update(delta)
        }

        for (const projectile of this.projectiles) {
            projectile.update(delta);
        }

        for (let i = 0; i < this.rats.length; i++) {
            this.rats[i].update(delta);

            if (this.rats[i].c.hp <= 0) {
                this.rats.splice(i, 1);
                i -= 1;
                this.game?.sound.playEffect('death');
            }
        }
    }

    draw(context: CanvasRenderingContext2D) {
        this.sceneDraw(context);

        if (!this.interactive) {
            return;
        }

        this.game?.panel?.draw(context);

        for (const object2D of this.objects2D) {
            object2D.draw(context);

            if (this._debug) {
                object2D.entity?.draw(context);
            }
        }

        for (const projectile of this.projectiles) {
            projectile.draw(context);
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