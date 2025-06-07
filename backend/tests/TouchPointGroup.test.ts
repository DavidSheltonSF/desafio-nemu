import { TouchPointGrouper } from '../src/services/helpers/TouchPointGrouper';

const fakeTouchPoints = [
  { sessionId: 'session1', createdAt: '2024-06-01T10:00:00Z', source: 'facebook' },
  { sessionId: 'session1', createdAt: '2024-06-01T10:01:40Z', source: 'organic' },
  { sessionId: 'session2', createdAt: '2024-06-01T10:03:20Z', source: 'instagram' },
  { sessionId: 'session2', createdAt: '2024-06-01T10:05:00Z', source: 'facebook' },
  { sessionId: 'session3', createdAt: '2024-06-01T10:06:40Z', source: 'organic' },
];

describe('greet function', () => {
  test('Should return a list of touch points grouped by session id', () => {
    
    const groupedTouchPoints = TouchPointGrouper.groupBySessionId(fakeTouchPoints);
    expect(groupedTouchPoints[0].sessionId).toBeTruthy()
  });
});
