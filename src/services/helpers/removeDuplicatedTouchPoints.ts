import { TouchPoint } from "../../models/TouchPoint";

export function removeDubplicatedTouchPoints(touchPoints: Omit<TouchPoint, "sessionId">[], canRepeat: string[] | null = null){

  const result: Omit<TouchPoint, "sessionId">[] = []
  const registeredSources: string[] = [];

  for (let i=0; i<touchPoints.length; i++){

    const currentTouchPoint = touchPoints[i];

    if(canRepeat?.includes(currentTouchPoint.source)){
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