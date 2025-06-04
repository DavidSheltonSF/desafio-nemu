import { TouchPoint } from "../../models/TouchPoint"


/**
 * 
 * Order an array of touch points by their creation date
 * 
 * @param touchPoints - An array of touch points
 * @returns An array of touch points ordered by their creation date
 */
export function orderTouchPointsByDate(touchPoints: Array<Omit<TouchPoint, "sessionId">>): Array<Omit<TouchPoint, "sessionId">> {

    const tempList = touchPoints.slice();

    tempList.sort((a, b) => {
      return Date.parse(b.createdAt) - Date.parse(a.createdAt);
    });

    return tempList
}
