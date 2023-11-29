import FCAccountAvatar from '@/components/common/account/FCAccountAvatar'
import FCAccountUsername from '@/components/common/account/FCAccountUsername'
import { TConversation } from '@/types/message'

type Props = {
  children?: React.ReactNode
  className?: string
  conversation: TConversation
  unread: number
  [x: string]: any
}

export default function FCMessagingGroup({
  children,
  className = '',
  conversation,
  unread,
  ...rest
}: Props) {
  return (
    <div className={`fc-messaging-group ${className}`} {...rest}>
      <div className="message-avatar">
        <FCAccountAvatar className="avatar" account={conversation.user} />
      </div>

      <div className="flex-col flex-1 min-width-0">
        <div className="flex-row">
          <div className="message-contact">
            <FCAccountUsername
              className="xs-mobile-hidden"
              account={conversation.user}
            />
            <FCAccountUsername
              className="xs-mobile-visible"
              maxLength={10}
              account={conversation.user}
            />
          </div>

          {unread > 0 && (
            <div className="badge-container flex-row">
              <div className="badge">{unread}</div>
            </div>
          )}

          <div className="message-time">{conversation.timestamp}</div>
        </div>
        <div className="font-size-xs dark-blue-1 eclipse">
          {conversation.lastMessage}
        </div>
      </div>
    </div>
  )
}
