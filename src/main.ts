import { Game } from "./Game";
import { Resource } from "./Resource";
import { getScene } from "./scenes/1";
import { Sprite } from "./Sprite";

const node = document.getElementById('app') as HTMLCanvasElement;

if (!node) {
  throw new Error();
}

const game = new Game(node);

game.resources = {
  furniture: new Resource('public/sprites/furniture.png'),
  interior: new Resource('public/sprites/interior.png'),
  cat: new Resource('public/sprites/cat.png'),
  ball: new Resource('public/sprites/ball.png'),
  rat: new Resource('public/sprites/rat.png'),
};

game.sprites = {
  furniture: new Sprite(game.resources['furniture'], {
    table: { width: 32, height: 16, sx: 0, sy: 17 },
    sofa: { width: 32, height: 16, sx: 34, sy: 85 },
    fridge: { width: 16, height: 32, sx: 204, sy: 290 },
    kitchen: {width: 61, height: 32, sx: 442, sy: 119 },
    chair_hor: { width: 11, height: 15, sx: 2, sy: 35 },
    chair_ver_1: { width: 10, height: 15, sx: 3, sy: 52 },
    chair_ver_2: { width: 10, height: 15, sx: 20, sy: 52 },
    door: {width: 16, height: 32, sx: 340, sy: 120 },
    window: {width: 16, height: 32, sx: 17, sy: 69 },
    tv: { width: 32, height: 16, sx: 153, sy: 85},
    tv_table: { width: 32, height: 14, sx: 306, sy: 70},
    chair2: {width: 13, height: 13, sx: 307, sy: 172}
  }),
  interior: new Sprite(game.resources['interior'], {
    corner: { width: 8, height: 8, sx: 27, sy: 100 },
    wall: { width: 8, height: 8, sx: 9, sy: 0 },
    wall2: { width: 8, height: 8, sx: 18, sy: 0 },
    floor: { width: 8, height: 8, sx: 0, sy: 9 },
  }),
  cat: new Sprite(game.resources['cat'], {
    idle: { width: 16, height: 16, gap: 0, count: 4, interval: 250, finite: false, sx: 0, sy: 4 },
    run: { width: 16, height: 16, gap: 0, count: 4, interval: 200, finite: false, sx: 0, sy: 36 },
    attack: { width: 16, height: 16, gap: 0, count: 4, interval: 100, finite: true, sx: 0, sy: 84 },
    death: { width: 16, height: 16, gap: 0, count: 4, interval: 250, finite: true, sx: 0, sy: 212 },
  }),
  ball: new Sprite(game.resources['ball'], {
    run: { width: 32, height: 32, gap: 0, count: 4, interval: 200, finite: false, sx: 0, sy: 0 }
  }),
  rat: new Sprite(game.resources['rat'], {
    run: { width: 32, height: 32, gap: 0, count: 8, interval: 200, finite: false, sx: 2, sy: 103 }
  })
};

const scene1 = getScene(game);

game.setScene(scene1);

game
  .load()
  .then(() => game.init())
  .then(() => game.renderer.start());