import FCMessagesRoute from '@/components/pages/messages/FCMessagesRoute'
import { mockConversations } from '@/mock/message'
import { mockCreatorAccounts } from '@/mock/users'

type Props = {
  params: {
    id: string
  }
}

export default function Page({ params }: Props) {
  return (
    <FCMessagesRoute
      conversations={mockConversations}
      conversationId={params.id}
      account={mockCreatorAccounts[2]}
    />
  )
}
