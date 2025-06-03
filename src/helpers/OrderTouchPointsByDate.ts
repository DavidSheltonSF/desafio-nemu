import { TouchPoint } from "../models/TouchPoint"

export class OrderTouchPointsByDate {
  
  static execute(list: Array<TouchPoint>) {

    const tempList = list.slice();

    tempList.sort((a, b) => {
      return Date.parse(a.createdAt) - Date.parse(b.createdAt);
    });

    return tempList
  }
}