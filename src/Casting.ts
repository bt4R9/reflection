import { Ray } from "./Ray";
import type { Vector } from "./Vector";
import type { World } from "./World";

export class Casting {
    private world: World;

    constructor(world: World) {
        this.world = world;
    }

    cast(ray: Ray, depth: number = 10) {
        let currentRay = ray;

        const intersections: Vector[] = [ray.origin];

        for (let bounce = 0; bounce < depth; bounce++) {
            let closestPt = null;
            let closestLine = null;
            let minDist = Infinity;

            for (let entity of this.world.entities) {
                for (const line of entity.lines) {
                    const pt = currentRay.intersect(line);
                    if (pt) {
                        const dist = pt.sub(currentRay.origin).length();
                        if (dist < minDist) {
                            minDist = dist;
                            closestPt = pt;
                            closestLine = line;
                        }
                    }

                }
            }

            if (!closestPt || !closestLine) break;
            closestPt = closestPt.add(currentRay.direction.scale(0.001)); // Small offset to avoid precision issues
            intersections.push(closestPt);

            const lineDir = closestLine.p2.sub(closestLine.p1).normalize();
            let normal = lineDir.perpendicular().normalize();

            if (normal.dot(currentRay.direction) > 0) {
                normal = normal.negate();
            }

            const reflectedDir = currentRay.reflect(normal);

            currentRay = new Ray(
                closestPt.add(reflectedDir.scale(0.01)),
                reflectedDir
            );
        }

        return intersections;
    }
}