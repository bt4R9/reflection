import { animate, B, drawSkip, H, HH, HW, W } from "../common";
import type { Game } from "../Game";
import { Scene } from "../Scene";

function createColorStepper(steps = 100) {
  let currentStep = 0;

  return function nextColor() {
    if (currentStep > steps) currentStep = steps;

    // Calculate red value (0 to 255)
    const red = Math.round((currentStep / steps) * 255);

    // Convert to 2-digit hex
    const hexRed = red.toString(16).padStart(2, '0');

    currentStep++;

    // Return color string
    return `#${hexRed}0000`;
  };
}

export const getScene2 = (game: Game) => {
  const fn = animate([
    'ACT 1',
    'Kitchen',
  ], 8, 250);

  let t = -1;

  const color = createColorStepper(500);

  const scene = new Scene((ctx) => {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, W, H);

    const { lines, done } = fn();

    if (done && t === -1) {
      t = setTimeout(() => {
        if (game.order < 3) {
          game.nextScene();
        }
      }, 1000);
    }

    ctx.fillStyle = color();
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