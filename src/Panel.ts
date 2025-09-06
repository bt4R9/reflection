import type { Game } from "./Game";
import { Projectile } from "./Projectile";
import { Vec } from "./Vector";

export class Panel {
    game: Game;
    ball: Projectile;

    constructor(game: Game) {
        this.game = game;
        this.ball = new Projectile(new Vec(440, 44), new Vec(0, 0), game, 0);
    }

    draw(ctx: CanvasRenderingContext2D) {
        const seconds = (this.game.scene.timeLeft / 1000).toFixed(0);

        ctx.fillStyle = '#000000';
        ctx.fillRect(430, 0, 200, 60);

        ctx.font = '16px monospace';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`Time left: ${seconds}s`, 500, 10);

        this.ball.draw(ctx);

        ctx.fillStyle = '#ffffff';
        ctx.fillText(`: ${this.game.player?.balls ?? 0}`, 464, 37);

        this.game.sprites['ball']
    }
}