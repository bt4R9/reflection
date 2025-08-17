import { animate, B, H, HH, HW, W } from "../common";
import type { Game } from "../Game";
import { Scene } from "../Scene";

export const getScene0 = (game: Game) => {
    const fn = animate([
        'They say black cat brings bad luck',
        'But today the black cat is unlucky',
        'Once a predator, now it is just a pitiful parody',
        'Your reputation is tarnished, the masters are displeased',
        'Get your reputation back as a predator to stay home',
    ], 24);

    let t = -1;

    const scene = new Scene((ctx) => {
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, W, H);

        const {lines, done} = fn();

        if (done && t === -1) {
            t = setTimeout(() => {
                if (game.s < 1) {
                    game.setScene(game.s + 1);
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

        ctx.font = '16px monospace';
        ctx.fillStyle = '#4d4343';
        ctx.fillText('[Press space to skip]', HW, H - B * 2);
    }, false);

    return scene;
}