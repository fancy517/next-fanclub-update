import { TNotification } from '@/types'
import { mockCreatorAccounts } from './users'

export const mockNotifications: Array<TNotification> = [
  {
    id: 1,
    type: 'postreply',
    user: mockCreatorAccounts[0],
    timestamp: 'Aug 19',
  },
  {
    id: 2,
    type: 'postreply',
    user: mockCreatorAccounts[1],
    timestamp: 'Aug 19',
  },
  {
    id: 3,
    type: 'follow',
    user: mockCreatorAccounts[2],
    timestamp: 'Aug 19',
  },
  {
    id: 4,
    type: 'follow',
    user: mockCreatorAccounts[3],
    timestamp: 'Aug 19',
  },
  {
    id: 5,
    type: 'postlike',
    user: mockCreatorAccounts[0],
    timestamp: 'Aug 19',
  },
  {
    id: 6,
    type: 'postlike',
    user: mockCreatorAccounts[1],
    timestamp: 'Aug 19',
  },
  {
    id: 7,
    type: 'planstarted',
    user: mockCreatorAccounts[0],
    timestamp: 'Aug 19',
  },
  {
    id: 8,
    type: 'subscriptionexpire',
    user: mockCreatorAccounts[3],
    timestamp: 'Aug 19',
  },
  {
    id: 9,
    type: 'follow',
    user: mockCreatorAccounts[3],
    timestamp: 'Aug 19',
  },
  {
    id: 10,
    type: 'follow',
    user: mockCreatorAccounts[0],
    timestamp: 'Aug 19',
  },
]
