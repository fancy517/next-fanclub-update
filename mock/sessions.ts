import { TSession } from '@/types/session'

export const mockSessions: Array<TSession> = [
  {
    ipAddress: '127.0.0.1',
    lastUsed: 132,
    location: 'US, New York, NY',
    active: true,
  },
  {
    ipAddress: '127.0.0.2',
    lastUsed: 132,
    location: 'US, California',
  },
]
