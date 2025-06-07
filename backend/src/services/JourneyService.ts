import { TouchPoint } from '../models/TouchPoint';
import { Journey } from '../models/Journey';
import { ExcelFileHandler } from './helpers/ExcelFileHandler';
import { removeDubplicatedTouchPoints } from './helpers/removeDuplicatedTouchPoints';
import { TouchPointListSorter } from './helpers/TouchPointListSorter';
import { TouchPointGroup } from './helpers/TouchPointGroup';

export class JourneyService {
  constructor() {}

  async readFile(): Promise<Journey[]> {
    const fileHandler = new ExcelFileHandler('src/public/data.xlsx');

    const data = await fileHandler.readLines();

    // Remove column identifier
    data.shift();

    const touchPointGroup = new TouchPointGroup();
    // Extract necessary columns
    data.forEach((row: any) => {
      const touchPoint: TouchPoint = {
        sessionId: row[4],
        createdAt: row[5],
        source: row[0],
      };

      touchPointGroup.add(touchPoint);
    });

    const journeys = touchPointGroup.groupBySessionId();

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
