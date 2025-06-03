import { TouchPoint } from "./TouchPoint";

export interface Journey {
  id?: string,
  sessionId: string,
  touchPoints: TouchPoint[]
}