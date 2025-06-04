import { TouchPoint } from "../../models/TouchPoint";


/**
 * 
 * Removes touch points with duplicated sources
 * 
 * @param touchPoints - An array of touch points
 * @param canRepeat - An array containing the indices of the touch points that will be returned even if they have duplicated sources
 * @returns an array without touch points  with duplicated sources
 */
export function removeDubplicatedTouchPoints(touchPoints: Omit<TouchPoint, "sessionId">[], canRepeat: number[]): Omit<TouchPoint, "sessionId">[]{

  const result: Omit<TouchPoint, "sessionId">[] = []
  const registeredSources: string[] = [];

  for (let i=0; i<touchPoints.length; i++){

    const currentTouchPoint = touchPoints[i];

    if(canRepeat.includes(i)){
      result.push(currentTouchPoint);
      continue;
    }
    
    if(!registeredSources.includes(currentTouchPoint.source)){
      result.push(currentTouchPoint);
      registeredSources.push(currentTouchPoint.source); 
      continue;
    }
  }
  return result;

}