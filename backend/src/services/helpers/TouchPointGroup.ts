import { Journey } from '../../models/Journey';
import { TouchPoint } from '../../models/TouchPoint';

export class TouchPointGroup {
  private readonly touchPoints: TouchPoint[] = [];

  constructor() {}

  add(touchPoint: TouchPoint): void {
    this.touchPoints.push(touchPoint);
  }

  groupBySessionId(): Journey[] {
    const map = new Map();

    for (const touchPoint of this.touchPoints) {
      if (!map.has(touchPoint.sessionId)) {
        map.set(touchPoint.sessionId, []);
      }

      map.get(touchPoint.sessionId).push({
        createdAt: touchPoint.createdAt,
        source: touchPoint.source,
      });
    }

    const journey: Journey[] = [];

    for (const [k, v] of map.entries()) {
      journey.push({
        sessionId: k,
        touchPoints: v,
      });
    }

    return journey;
  }
}
