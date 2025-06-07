import { TouchPoint } from '../models/TouchPoint';
import { Journey } from '../models/Journey';
import { ExcelFileHandler } from './helpers/ExcelFileHandler';
import { removeDubplicatedTouchPoints } from './helpers/removeDuplicatedTouchPoints';
import { TouchPointListSorter } from './helpers/TouchPointListSorter';

export class JourneyService {
  constructor() {}

  async execute(): Promise<Record<string, any>> {
    const fileHandleer = new ExcelFileHandler('src/public/data.xlsx');

    const data = await fileHandleer.readLines();

    // Remove column identifier
    data[0].shift();

    const touchPoints: TouchPoint[] = [];

    // Extract necessary columns
    data[0].forEach((row: any) => {
      const tempObj = {
        sessionId: row[4],
        createdAt: row[5],
        source: row[0],
      };

      touchPoints.push(tempObj);
    });

    const journeysObj: Record<string, Omit<TouchPoint, 'sessionId'>[]> = {};

    // Groupy touchpoints by sessionId into objects
    touchPoints.forEach((row) => {
      if (!journeysObj[row['sessionId']]) {
        journeysObj[row['sessionId']] = [];
      }

      const tempObj = {
        createdAt: row['createdAt'],
        source: row['source'],
      };
      journeysObj[row['sessionId']].push(tempObj);
    });

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
