import { TouchPointWithOptionalSessionId } from '../../models/TouchPoint';

export class TouchPointListSorter {
  static sortByNewest(
    touchPoints: TouchPointWithOptionalSessionId[]
  ): TouchPointWithOptionalSessionId[] {
    const sortedTouchPoints = touchPoints.slice();

    sortedTouchPoints.sort(
      (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt)
    );

    return sortedTouchPoints;
  }

  static sortByOldest(
    touchPoints: TouchPointWithOptionalSessionId[]
  ): TouchPointWithOptionalSessionId[] {
    const sortedTouchPoints = touchPoints.slice();

    sortedTouchPoints.sort(
      (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
    );

    return sortedTouchPoints;
  }
}
