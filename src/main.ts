import { Game } from "./Game";
import { Resource } from "./Resource";
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
  granny: new Resource('public/sprites/granny.png'),

  fridge: new Resource('public/sprites/furniture/fridge.png'),
  kitchen: new Resource('public/sprites/furniture/kitchen.png'),
  window: new Resource('public/sprites/furniture/window.png'),
  tv: new Resource('public/sprites/furniture/tv.png'),
  table: new Resource('public/sprites/furniture/table.png'),
  plant: new Resource('public/sprites/furniture/plant.png'),
  chair: new Resource('public/sprites/furniture/chair.png'),
  chair2: new Resource('public/sprites/furniture/chair2.png'),
  door: new Resource('public/sprites/furniture/door.png'),
  shelf: new Resource('public/sprites/furniture/shelf.png'),
  wash: new Resource('public/sprites/furniture/wash.png'),
  stable: new Resource('public/sprites/furniture/small-table.png'),
  lamp: new Resource('public/sprites/furniture/lamp.png')
};

game.sprites = {
  fridge: new Sprite(game.resources['fridge'], {
    fridge: [0, 0, 39, 32]
  }),
  wash: new Sprite(game.resources['wash'], {
    wash: [0, 0, 16, 16]
  }),
  kitchen: new Sprite(game.resources['kitchen'], {
    kitchen: [0, 0, 61, 32]
  }),
  table: new Sprite(game.resources['table'], {
    table: [0, 0, 32, 16],
  }),
  plant: new Sprite(game.resources['plant'], {
    plant: [0, 0, 8, 12],
  }),
  window: new Sprite(game.resources['window'], {
    window: [0, 0, 16, 32],
  }),
  chair: new Sprite(game.resources['chair'], {
    chair: [0, 0, 13, 13],
  }),
  chair2: new Sprite(game.resources['chair2'], {
    chair2: [0, 0, 10, 15],
  }),
  door: new Sprite(game.resources['door'], {
    door: [0, 0, 16, 32]
  }),
  tv: new Sprite(game.resources['tv'], {
    tv: [0, 0, 32, 16],
  }),
  shelf: new Sprite(game.resources['shelf'], {
    shelf: [0, 0, 31, 16],
  }),
  stable: new Sprite(game.resources['stable'], {
    stable: [0, 0, 16, 15]
  }),
  lamp: new Sprite(game.resources['lamp'], {
    lamp: [0, 0, 12, 16]
  }),
  cat: new Sprite(game.resources['cat'], {
    idle: [2, 8, 10, 10, 4, 6, 250, false],
    run: [2, 40, 10, 10, 4, 6, 200, false],
    attack: [2, 88, 12, 10, 4, 4, 100, true],
    death: [0, 212, 16, 16, 4, 0, 250, true],
  }),
  ball: new Sprite(game.resources['ball'], {
    run: [0, 0, 32, 32, 4, 0, 200, false],
  }),
  rat: new Sprite(game.resources['rat'], {
    run: [2, 103, 32, 32, 8, 0, 200, false],
  }),
  granny: new Sprite(game.resources['granny'], {
    idle: [0, 0, 28, 29, 1, 4, 250, false],
    run: [0, 0, 28, 29, 4, 4, 200, false],
  }),
};

game
  .load()
  .then(() => game.init())
  .then(() => game.renderer.start());