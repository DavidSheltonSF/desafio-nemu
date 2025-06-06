export interface TouchPoint {
  id?: string,
  sessionId: string
  createdAt: string,
  source: string
}

export interface TouchPointWithOptionalSessionId extends Omit<TouchPoint, "sessionId"> {
  sessionId?: string
}