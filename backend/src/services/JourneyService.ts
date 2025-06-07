import {
  TouchPoint,
  TouchPointWithOptionalSessionId,
} from '../models/TouchPoint';
import { Journey } from '../models/Journey';
import { ExcelFileHandler } from './helpers/ExcelFileHandler';
import { removeDubplicatedTouchPoints } from './helpers/removeDuplicatedTouchPoints';
import { TouchPointListSorter } from './helpers/TouchPointListSorter';
import { groupTouchPointsBySessionId } from './helpers/groupTouchPointsBySessionId';

export class JourneyService {
  constructor() {}

  async readFile(): Promise<Record<string, any>> {
    const fileHandler = new ExcelFileHandler('src/public/data.xlsx');

    const data = await fileHandler.readLines();

    // Remove column identifier
    data.shift();

    const touchPoints: TouchPoint[] = [];

    // Extract necessary columns
    data.forEach((row: any) => {
      const touchPoint: TouchPoint = {
        sessionId: row[4],
        createdAt: row[5],
        source: row[0],
      };

      touchPoints.push(touchPoint);
    });

    const journeysObj = groupTouchPointsBySessionId(touchPoints);

    const journeys: Journey[] = [];

    // Extract each journey object and put it into a list
    for (const [k, v] of Object.entries(journeysObj)) {
      const tempObj = {
        sessionId: k,
        touchPoints: TouchPointListSorter.sortByOldest(
          removeDubplicatedTouchPoints(v, [0, v.length - 1])
        ),
      };

      journeys.push(tempObj);
    }

    return journeys;
  }
}
