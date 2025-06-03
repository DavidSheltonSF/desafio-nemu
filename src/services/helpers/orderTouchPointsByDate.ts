import { TouchPoint } from "../../models/TouchPoint"

export function oderTouchPointsByDate(list: Array<Omit<TouchPoint, "sessionId">>) {

    const tempList = list.slice();

    tempList.sort((a, b) => {
      return Date.parse(a.createdAt) - Date.parse(b.createdAt);
    });

    return tempList
}
