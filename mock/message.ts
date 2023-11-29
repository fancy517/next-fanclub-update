import { TConversation } from '@/types/message'
import { mockCreatorAccounts } from './users'

export const mockConversations: Array<TConversation> = [
  {
    id: '6513216547',
    user: mockCreatorAccounts[0],
    timestamp: 'Oct 8',
    lastMessage: 'Hello this is last message 0',
  },
  {
    id: '657132103',
    user: mockCreatorAccounts[1],
    timestamp: 'Nov 8',
    lastMessage: 'Hello this is last message 1',
  },
  {
    id: '98651324687',
    user: mockCreatorAccounts[2],
    timestamp: 'Oct 9',
    lastMessage: 'Hello this is last message 1',
  },
]
