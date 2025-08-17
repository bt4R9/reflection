import { Entity } from "../Entity";
import type { Game } from "../Game";
import { Object2D } from "../Object2D";
import { Projectile } from "../Projectile";
import { Rat } from "../Rat";
import { Scene } from "../Scene";
import { Vector } from "../Vector";
import {W, H, HW, B, HH} from '../common';

export const getScene2 = (game: Game) => {
    const R = B / 6;

    const scene = new Scene((ctx) => {
        // clear
        ctx.fillStyle = '#b0b897';
        ctx.fillRect(B, B * 5, 700, 500);

        // borders
        ctx.fillStyle = '#545046';
        ctx.beginPath();
        ctx.rect(0, 0, B, H);
        ctx.rect(0, 0, HW, B);
        ctx.rect(HW, 0, B, B * 2);
        // ctx.rect(w / 2, 220, w / 2, b);
        ctx.rect(W - B, 220, W - B, H - 220);
        ctx.rect(0, H - B, W, H);
        ctx.rect(HW, B * 2, HW, B);
        ctx.rect(W - B, B * 2, B, H - B * 2);
        ctx.fill();
        ctx.closePath();
        // kitchen wall
        ctx.beginPath();
        ctx.fillStyle = '#6e6244';
        ctx.rect(B, B, HW - B, 150);
        ctx.fill();
        ctx.closePath();
        // wall
        ctx.beginPath();
        ctx.fillStyle = '#445216';
        ctx.rect(HW, B * 3, 352, 164);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle = '#a6b379';
        for (let i = 0; i < 22; i++) {
            ctx.rect(HW + i * B / 2, B * 3, R, 164);
        }
        ctx.fill();
        ctx.closePath();
        // floor
        ctx.beginPath();
        ctx.fillStyle = '#ffffff';
        ctx.rect(B, 180, HW - B , R);
        ctx.rect(B, 180, R, HH + B * 2 + 10);
        ctx.rect(B, H - B - R, W - B * 2, R);
        ctx.rect(HW - R, 180, R, 80);
        ctx.rect(HW - R, 258, 354, R);
        ctx.rect(W - B - R, 258, R, 280);
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
        new Object2D([600, 420], 13 * 3, 13 * 3, furniture, 'chair2'),
        new Object2D([54, 516], 24, 32, furniture, 'flowers'),
    ];

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
    scene.projectiles.push(new Projectile(new Vector(78, 520), new Vector(0, 0), game, 0));

    scene.rats.push(new Rat(new Vector(64, 400), game));
    scene.rats.push(new Rat(new Vector(64, 400), game));
    scene.rats.push(new Rat(new Vector(64, 400), game));
    scene.rats.push(new Rat(new Vector(64, 400), game));
    scene.rats.push(new Rat(new Vector(64, 400), game));
    scene.rats.push(new Rat(new Vector(64, 400), game));
    scene.rats.push(new Rat(new Vector(64, 400), game));

    return scene;
}