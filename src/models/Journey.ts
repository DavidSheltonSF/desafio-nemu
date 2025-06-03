import { TouchPoint } from "./TouchPoint";

export interface Journey {
  id?: string,
  sessionId: string,
  touchPoints: Omit<TouchPoint, "sessionId">[]
}