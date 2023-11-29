import { TAccount } from './account'

export type TConversation = {
  id: string
  user: TAccount
  timestamp: string
  lastMessage: string
}
