import { TouchPoint } from '../models/TouchPoint';
import { Journey } from '../models/Journey';
import { ExcelFileHandler } from './helpers/ExcelFileHandler';
import { removeDubplicatedTouchPoints } from './helpers/removeDuplicatedTouchPoints';
import { TouchPointListSorter } from './helpers/TouchPointListSorter';
import { TouchPointGrouper } from './helpers/TouchPointGrouper';

export class JourneyService {
  constructor() {}

  async readFile(): Promise<Journey[]> {
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

    const journeys = TouchPointGrouper.groupBySessionId(touchPoints);

    for (const journey of journeys) {
      journey.touchPoints = TouchPointListSorter.sortByOldest(
        removeDubplicatedTouchPoints(journey.touchPoints, [
          0,
          journey.touchPoints.length - 1,
        ])
      );
    }
    return journeys;
  }
}
