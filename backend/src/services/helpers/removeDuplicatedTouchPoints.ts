import { TouchPointWithOptionalSessionId } from "../../models/TouchPoint";

export function removeDubplicatedTouchPoints(touchPoints: TouchPointWithOptionalSessionId[], repeatableIndexes: number[]): TouchPointWithOptionalSessionId[]{

  const filteredTouchPoints: TouchPointWithOptionalSessionId[] = []
  const registeredSources: string[] = [];

  for (let i=0; i<touchPoints.length; i++){

    const currentTouchPoint = touchPoints[i];

    if(repeatableIndexes.includes(i)){
      filteredTouchPoints.push(currentTouchPoint);
      continue;
    }
    
    if(!registeredSources.includes(currentTouchPoint.source)){
      filteredTouchPoints.push(currentTouchPoint);
      registeredSources.push(currentTouchPoint.source); 
    }

  }

  return filteredTouchPoints;

}