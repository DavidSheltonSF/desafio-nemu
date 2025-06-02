import { ExcelHandler } from "../helpers/ExcelHandler";

export class JourneyService {

  private readonly handler: ExcelHandler

  constructor(){
    this.handler = new ExcelHandler("src/public/data.xlsx");
  }

  async execute(): Promise<Record<string, any>> {
    const data = await this.handler.readLines();

    console.log(data[0].length)

    const cleanData: any = []
    
    data[0].forEach((row: any) => {
      // sessionId, createAt, source
      cleanData.push([row[4], row[5], row[0]])
    });

    //console.log(cleanData)


    const journeysObj: any = {}
 
    cleanData.forEach((row) => {
      //console.log(row[0])
      if (!journeysObj[row[0]]){
        journeysObj[row[0]] = []
      }

      journeysObj[row[0]].push([row[1], row[2]]);
    })
    
    //console.log(journeysObj)
    const journeys: any = []

    for (const [k, v] of Object.entries(journeysObj)){
      const tempObj = new Object()
      tempObj[k] = v
      journeys.push(tempObj)
    }


    return journeys

  }
}



