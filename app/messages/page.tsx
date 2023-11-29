import FCMessagesRoute from '@/components/pages/messages/FCMessagesRoute'
import { mockConversations } from '@/mock/message'

export default function MessagesPage() {
  return <FCMessagesRoute conversations={mockConversations} />
}
