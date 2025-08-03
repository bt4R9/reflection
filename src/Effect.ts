import type { Vector } from "./Vector";

export class Effect {
    position: Vector;
    start: number;
    end: number;
    value: number;
    duration: number;

    private startTime: number;

    constructor(position: Vector, start: number, end: number, duration: number) {
        this.position = position;
        this.start = start;
        this.end = end;
        this.duration = duration;
        this.value = start;

        this.startTime = performance.now();
    }

    update() { 
      const now = performance.now();
      const elapsed = now - this.startTime;
      const t = Math.min(elapsed / this.duration, 1);
 
      this.value = interpolateEaseInOut(t, this.start, this.end);
    }
}

function easeInOutCubic(t: number): number {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// function easeOutInCubic(t: number) {
//   if (t < 0.5) {
//     // easeOutCubic scaled to first half
//     const x = t * 2;
//     return 0.5 * (1 - Math.pow(1 - x, 3));
//   } else {
//     // easeInCubic scaled to second half
//     const x = (t - 0.5) * 2;
//     return 0.5 + 0.5 * (x * x * x);
//   }
// }

function interpolateEaseInOut(t: number, start: number, end: number): number {
  const eased = easeInOutCubic(t);
  return start + (end - start) * eased;
}