import { H, W, B, HH, R, HW, drawSkip } from "../common";
import type { Game } from "../Game";
import { Scene } from "../Scene";

export const getScene0 = (game: Game) => {
    const scene = new Scene((ctx) => {
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, W, H);

        ctx.strokeStyle = '#ffffff';
        ctx.strokeRect(HW - B * 3, HH - B, B, B);
        ctx.strokeRect(HW - B * 3, HH + R, B, B);
        ctx.strokeRect(HW - B * 2 + R, HH + R, B, B);
        ctx.strokeRect(HW - B * 4 - R, HH + R, B, B);

        ctx.fillStyle = '#fff';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'center';
        ctx.font = '14px monospace';

        ctx.fillText('W', HW - B * 3 + R * 2, HH - R * 3);
        ctx.fillText('S', HW - B * 3 + R * 2, HH + R * 2);
        ctx.fillText('A', HW - B * 4 + R, HH + R * 2);
        ctx.fillText('D', HW - B * 2 + R * 3, HH + R * 2);

        ctx.strokeRect(HW + 50, HH - 50, 30, 50);
        ctx.strokeRect(HW + 50 + 30, HH - 50, 30, 50);
        ctx.strokeRect(HW + 50, HH - 50, 60, 125);

        ctx.fillText('Attack', HW + 40, HH - 75);
        ctx.fillText('Throw', HW + 120, HH - 75);

        drawSkip(ctx);
    }, false);

    setTimeout(() => {
        if (game.order < 1) {
            game.nextScene();
        }
    }, 5000);

    return scene;
}