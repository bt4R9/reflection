import { Entity } from "../Entity";
import type { Game } from "../Game";
import { O2D } from "../Object2D";
import { Projectile } from "../Projectile";
import { Rat } from "../Rat";
import { Scene } from "../Scene";
import { Vec } from "../Vector";
import { W, H, HW, B, R, HH } from '../common';

export const getScene3 = (game: Game) => {
    const scene = new Scene((ctx) => {
        // clear
        ctx.fillStyle = '#b0b897';
        ctx.fillRect(B, B * 6, W - B * 2, H - B * 7);

        // borders
        ctx.fillStyle = '#545046';
        ctx.beginPath();
        ctx.rect(0, 0, B, H);
        ctx.rect(0, 0, HW, B);
        ctx.rect(HW, 0, B, B * 2);
        ctx.rect(0, H - B, W, H);
        ctx.rect(HW, B * 2, HW, B);
        ctx.rect(W - B, B * 2, B, H - B * 2);
        ctx.fill();
        ctx.closePath();
        // kitchen wall
        ctx.beginPath();
        ctx.fillStyle = '#6e6244';
        ctx.rect(B, B, HW - B, B * 5);
        ctx.fill();
        ctx.closePath();
        // wall
        ctx.beginPath();
        ctx.fillStyle = '#445216';
        ctx.rect(HW, B * 3, HW - B, HH - B * 4);
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
        ctx.rect(B, HH - B * 3, HW - B, R);
        ctx.rect(B, HH - B * 3, R, HH + B * 2);
        ctx.rect(B, H - B - R, W - B * 2, R);
        ctx.rect(HW - R, HH - B * 3, R, B * 2 + R);
        ctx.rect(HW - R, HH - B, HW - B, R);
        ctx.rect(W - B - R, HH - B, R, HH);
        ctx.fill();
        ctx.closePath();
    }, true, 60000);

    const hb = false;
    // scene._debug = true;

    scene.objects2D = [
        new O2D([B * 6 - R, B * 3 + R * 2], 5, game.sprites['kitchen'], 'kitchen', { hb }),
        new O2D([B * 8 + R, B * 5 - R], 5, game.sprites['wash'], 'wash', { hb }),
        new O2D([B * 12 + R + R, B * 3 + R * 2], 5, game.sprites['fridge'], 'fridge', { hb }),
        new O2D([B * 6, B * 10], 4, game.sprites['table'], 'table'),
        new O2D([B * 3, H - B * 3 - R], 4, game.sprites['plant'], 'plant'),
        new O2D([W - B * 6, HH - B * 3 - R * 2], 4, game.sprites['window'], 'window', { hb }),
        new O2D([W - B * 4, HH - B * 3 - R * 2], 4, game.sprites['window'], 'window', { hb }),
        new O2D([B * 5 + R, B * 11], 4, game.sprites['chair2'], 'chair2'),
        new O2D([B * 6 + R * 3, B * 11], 4, game.sprites['chair2'], 'chair2'),
        new O2D([W - B * 10, HH - B * 3], 4, game.sprites['door'], 'door', { hb }),
        new O2D([W - B * 5, HH + R], 4, game.sprites['table'], 'table'),
        new O2D([W - B * 5, HH - R], 4, game.sprites['tv'], 'tv', { hb }),
        new O2D([W - B * 5 - R * 3, HH + B * 5], 4, game.sprites['chair'], 'chair', {hb}),
        new O2D([W - B * 5 + R * 3, HH + B * 5], 4, game.sprites['chair'], 'chair', {hb}),
        new O2D([HW, H - B * 3], 4, game.sprites['stable'], 'stable'),
        new O2D([HW, H - B * 3 - R], 2, game.sprites['lamp'], 'lamp', {hb})
    ];

    scene.projectiles = [
        new Projectile(new Vec(56, 516), new Vec(0, 0), game, 0),
        new Projectile(new Vec(700, 290), new Vec(0, 0), game, 0),
        new Projectile(new Vec(HW, HH + B * 2), new Vec(0, 0), game, 0),
    ];

    scene.rats = [
        new Rat([340, 340], game),
        new Rat([340, 340], game),
        new Rat([340, 340], game),
        new Rat([80, 280], game),
        new Rat([80, 280], game),
        new Rat([80, 280], game),
        new Rat([700, 500], game),
        new Rat([700, 500], game),
        new Rat([700, 500], game),
    ];

    scene.entities = [
        Entity.polygon(new Vec(384, 360), [
            [-344, -160],
            [-8, -160],
            [-8, -96],
            [344, -96],
            [344, 176],
            [-344, 176]
        ], 'red'),
        Entity.polygon(new Vec(608, 448), [
            [-50, -25],
            [50, -25],
            [50, 25],
            [-50, 25]
        ], 'red')
    ];

    return scene;
}