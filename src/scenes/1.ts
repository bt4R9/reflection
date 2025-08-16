import { Entity } from "../Entity";
import type { Game } from "../Game";
import { Object2D } from "../Object2D";
import { Projectile } from "../Projectile";
import { Rat } from "../Rat";
import { Scene } from "../Scene";
import { Vector } from "../Vector";


export const getScene = (game: Game) => {
    const w = 768;
    const h = 576;
    const b = 36;
    const r = b / 6;

    const scene = new Scene((ctx) => {
        // clear
        ctx.fillStyle = '#b0b897';
        ctx.fillRect(b, b * 3, 700, 500);

        // borders
        ctx.fillStyle = '#545046';
        ctx.beginPath();
        ctx.rect(0, 0, b, h);
        ctx.rect(0, 0, w / 2, b);
        ctx.rect(w / 2, 0, b, b * 2);
        // ctx.rect(w / 2, 220, w / 2, b);
        ctx.rect(w - b, 220, w - b, h - 220);
        ctx.rect(0, h - b, w, h);
        ctx.rect(w / 2, b * 2, w / 2, b);
        ctx.rect(w - b, b * 2, b, h - b * 2);
        ctx.fill();
        ctx.closePath();
        // kitchen wall
        ctx.beginPath();
        ctx.fillStyle = '#6e6244';
        ctx.rect(b, b, w / 2 - b, 150);
        ctx.fill();
        ctx.closePath();
        // wall
        ctx.beginPath();
        ctx.fillStyle = '#445216';
        ctx.rect(w / 2, b * 3, 350, 150);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle = '#a6b379';
        for (let i = 0; i < 20; i++) {
            ctx.rect(w / 2 + i * b / 2, b * 3, r, 150);
        }
        ctx.fill();
        ctx.closePath();
        // floor
        ctx.beginPath();
        ctx.fillStyle = '#ffffff';
        ctx.rect(b, 180, w / 2 - b , r);
        ctx.rect(b, 180, r, h - b * 6);
        ctx.rect(b, h - b - r, w - b * 2, r);
        ctx.rect(w / 2 - r, 180, r, 84);
        ctx.rect(w / 2 - r, 258, 354, r);
        ctx.rect(w - b - r, 258, r, 280);
        ctx.fill();
        ctx.closePath();
    });

    const furniture = game.sprites['furniture'];
    // const interior = game.sprites['interior'];
    // scene._debug = true;
    const hb = false;

    scene.objects2D = [
        new Object2D([450, 210], 48, 96, furniture, 'door', {hb}),
        new Object2D([604, 180], 48, 96, furniture, 'window', {hb}),
        new Object2D([654, 180], 48, 96, furniture, 'window', {hb}),
        new Object2D([174, 106], 61 * 4.5, 32 * 4.5 + 3, furniture, 'kitchen', {hb}),
        new Object2D([346, 108], 74, 144, furniture, 'fridge', {hb}),
        new Object2D([210, 350], 128, 64, furniture, 'table'),
        new Object2D([190, 380], 26, 40, furniture, 'chair_ver_1'),
        new Object2D([230, 380], 26, 40, furniture, 'chair_ver_1'),
        new Object2D([580, 300], 128, 64, furniture, 'tv_table'),
        new Object2D([580, 280], 128, 64, furniture, 'tv'),
        new Object2D([550, 420], 13 * 3, 13 * 3, furniture, 'chair2'),
        new Object2D([600, 420], 13 * 3, 13 * 3, furniture, 'chair2')
    ];

    // for (let y = 96; y < 500; y += 64) {
    //     for (let x = 96; x < 700; x += 64) {
    //         scene.objects2D.push(new Object2D([x, y], 64, 64, interior, 'floor', {hb}));
    //     }
    // }

    scene.entities = [
        Entity.polygon(new Vector(384, 360), [
            [-342, -174],
            [-6, -174],
            [-6, -96],
            [342, -96],
            [342, 174],
            [-342, 174]
        ], 'red')
    ];

    scene.projectiles.push(new Projectile(new Vector(380, 290), new Vector(0, 0), game, 0));
    scene.projectiles.push(new Projectile(new Vector(74, 500), new Vector(0, 0), game, 0));

    scene.rats.push(new Rat(new Vector(64, 400), game));
    scene.rats.push(new Rat(new Vector(64, 400), game));
    scene.rats.push(new Rat(new Vector(64, 400), game));
    scene.rats.push(new Rat(new Vector(64, 400), game));
    scene.rats.push(new Rat(new Vector(64, 400), game));
    scene.rats.push(new Rat(new Vector(64, 400), game));
    scene.rats.push(new Rat(new Vector(64, 400), game));

    return scene;
}