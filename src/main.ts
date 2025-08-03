import { Line } from "./Line";
import { Renderer } from "./Renderer";
import { Square } from "./Square";
import { Vector } from "./Vector";
import { World } from "./World";

const node = document.getElementById('app') as HTMLCanvasElement;

if (!node) {
  throw new Error('No canvas element found');
}

const world = new World();

(window as any).world = world;

const top = new Line(new Vector(1, 1), new Vector(799, 1));
const bottom = new Line(new Vector(1, 599), new Vector(799, 599));
const left = new Line(new Vector(1, 1), new Vector(1, 599));
const right = new Line(new Vector(799, 1), new Vector(799, 599));

world.add(top);
world.add(bottom);
world.add(left);
world.add(right);

world
  .add(new Line(new Vector(40, 40), new Vector(300, 20)))
  .add(new Line(new Vector(300, 20), new Vector(500, 30)))
  .add(new Line(new Vector(500, 30), new Vector(750, 10)))
  .add(new Line(new Vector(750, 10), new Vector(790, 250)))
  .add(new Line(new Vector(790, 250), new Vector(750, 300)))
  .add(new Line(new Vector(750, 300), new Vector(790, 350)))
  .add(new Line(new Vector(790, 350), new Vector(780, 590)))
  .add(new Line(new Vector(780, 590), new Vector(600, 550)))
  .add(new Line(new Vector(600, 550), new Vector(400, 560)))
  .add(new Line(new Vector(400, 560), new Vector(200, 595)))
  .add(new Line(new Vector(200, 595), new Vector(190, 500)))
  .add(new Line(new Vector(190, 500), new Vector(150, 595)))
  .add(new Line(new Vector(150, 595), new Vector(30, 490)))
  .add(new Line(new Vector(30, 490), new Vector(50, 290)))
  .add(new Line(new Vector(50, 290), new Vector(10, 140)))
  .add(new Line(new Vector(10, 140), new Vector(40, 40)));

const sq1 = new Square(new Vector(250, 250), 75);
const sq2 = new Square(new Vector(450, 450), 90);
const sq3 = new Square(new Vector(550, 200), 90);

world.add(sq1).add(sq2).add(sq3);

node.addEventListener('mousemove', (e) => {
  const rect = node.getBoundingClientRect();

  const x = e.clientX - rect.left - 400;
  const y = e.clientY - rect.top - 300;

  world.ray.direction = new Vector(x, y).normalize();
});

document.getElementById('limit')?.addEventListener('input', (e) => {
  const input = e.target as HTMLInputElement;
  const value = parseInt(input.value, 10);
  
  if (!isNaN(value)) {
    world.limit = value;
  }
});

const renderer = new Renderer(node, world);

renderer.start(() => {
  sq1.rotate(0.002);
  sq2.rotate(-0.005);
  sq3.rotate(0.002);
});
