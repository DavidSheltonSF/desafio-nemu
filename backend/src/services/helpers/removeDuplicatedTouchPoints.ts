import { TouchPoint, TouchPointWithOptionalSessionId } from "../../models/TouchPoint";


/**
 * 
 * Removes touch points with duplicated sources
 * 
 * @param touchPoints - An array of touch points
 * @param canRepeat - An array containing the indices of the touch points that will be returned even if they have duplicated sources
 * @returns An array without touch points  with duplicated sources
 */
export function removeDubplicatedTouchPoints(touchPoints: TouchPointWithOptionalSessionId[], canRepeat: number[]): TouchPointWithOptionalSessionId[]{

  const filteredTouchPoints: TouchPointWithOptionalSessionId[] = []
  const registeredSources: string[] = [];

  for (let i=0; i<touchPoints.length; i++){

    const currentTouchPoint = touchPoints[i];

    if(canRepeat.includes(i)){
      filteredTouchPoints.push(currentTouchPoint);
      continue;
    }
    
    if(!registeredSources.includes(currentTouchPoint.source)){
      filteredTouchPoints.push(currentTouchPoint);
      registeredSources.push(currentTouchPoint.source); 
      continue;
    }
  }
  return filteredTouchPoints;

}