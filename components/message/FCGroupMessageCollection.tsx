import FCAccountAvatar from '@/components/common/account/FCAccountAvatar'
import FCGroupMessage from './FCGroupMessage'
import { mockCreatorAccounts } from '@/mock/users'

type Props = {
  children?: React.ReactNode
  className?: string
  onReply: (id: string) => void
  [x: string]: any
}

export default function FCGroupMessageCollection({
  children,
  className = '',
  onReply,
  ...rest
}: Props) {
  return (
    <div className={`fc-group-message-collection ${className}`} {...rest}>
      <div data-appmutation="" className="flex-row width-100">
        <FCAccountAvatar
          className="avatar"
          account={mockCreatorAccounts[0]}
          hideOnlineIndicator={true}
          statusMode={0}
        />

        <div className="flex-col width-100">
          <div className="flex-col width-100">
            <FCGroupMessage className="message" onReply={onReply} />
          </div>
          <div className="timestamp">Mar 12</div>
        </div>
      </div>
    </div>
  )
}
