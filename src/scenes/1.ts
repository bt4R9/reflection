import { animate, B, drawSkip, H, HH, HW, W } from "../common";
import type { Game } from "../Game";
import { Scene } from "../Scene";

export const getScene1 = (game: Game) => {
    const fn = animate([
        'They say black cat brings bad luck',
        'But today the black cat is unlucky',
        'There are rats in the house. Get rid of them before the owners come.',
        'Don\'t let your reputation be ruined or you\'ll be thrown out of the house',
    ], 24);

    let t = -1;

    const scene = new Scene((ctx) => {
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, W, H);

        const { lines, done } = fn();

        if (done && t === -1) {
            t = setTimeout(() => {
                if (game.order < 2) {
                    game.nextScene();
                }
            }, 2000);
        }

        ctx.fillStyle = '#fff';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'center';
        ctx.font = '24px monospace';

        let offsetY = 0;

        for (const line of lines) {
            ctx.fillText(line, HW, HH - B + offsetY);
            offsetY += B;
        }

        ctx.fill();

        drawSkip(ctx);
    }, false);

    return scene;
}