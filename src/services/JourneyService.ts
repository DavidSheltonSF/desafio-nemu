import { TouchPoint } from "../models/TouchPoint";
import { Journey } from "../models/Journey";
import { ExcelHandler } from "./helpers/ExcelHandler";
import { oderTouchPointsByDate } from "./helpers/orderTouchPointsByDate";

export class JourneyService {

  private readonly handler: ExcelHandler

  constructor(){
    this.handler = new ExcelHandler("src/public/data.xlsx");
  }

  async execute(): Promise<Record<string, any>> {
    const data = await this.handler.readLines();

    // Remove column identifier
    data[0].shift();

    const touchPoints: TouchPoint[] = []
    
    // Extract necessary columns
    data[0].forEach((row: any) => {

      const tempObj = {
        sessionId: row[4],
        createdAt: row[5],
        source: row[0]
      };

      touchPoints.push(tempObj);
    });

    const journeysObj: Record<string, Omit<TouchPoint, "sessionId">[]> = {}
    
    // Groupy touchpoints with same sessionId into objects
    touchPoints.forEach((row) => {
      //console.log(row[0])
      if (!journeysObj[row["sessionId"]]){
        //console.log(row["sessionId"])
        journeysObj[row["sessionId"]] = [];
      }

      const tempObj = {
        createdAt: row["createdAt"],
        source: row["source"]
      }
      journeysObj[row["sessionId"]].push(tempObj);
    })
    
    //console.log(journeysObj)
    const journeys: Journey[] = []

    // Extract each journey object and put it into a list
    for (const [k, v] of Object.entries(journeysObj)){

      const tempObj = {
        sessionId: k,
        touchPoints: oderTouchPointsByDate(v)
      }

      tempObj[k] = 
      journeys.push(tempObj)
    }

    console.log(journeys[0]);

    return journeys;

  }
}



