import { TouchPoint } from '../../models/TouchPoint';
import { TouchPointWithOptionalSessionId } from '../../models/TouchPoint';

export function groupTouchPointsBySessionId(
  touchPoints: TouchPoint[]
): Record<string, TouchPointWithOptionalSessionId[]> {
  const journeysObj: Record<string, TouchPointWithOptionalSessionId[]> = {};

  // Groupy touchpoints by sessionId into objects
  touchPoints.forEach((row) => {
    if (!journeysObj[row['sessionId']]) {
      journeysObj[row['sessionId']] = [];
    }

    const touchPoint: TouchPointWithOptionalSessionId = {
      createdAt: row['createdAt'],
      source: row['source'],
    };
    journeysObj[row['sessionId']].push(touchPoint);
  });

  return journeysObj;
}
