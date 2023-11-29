import FCAccountAvatar from '@/components/common/account/FCAccountAvatar'
import FCAccountUsername from '@/components/common/account/FCAccountUsername'
import { TNotification } from '@/types'

type Props = {
  children?: React.ReactNode
  className?: string
  data: TNotification
  [x: string]: any
}

export default function FCPostReplyNotification({
  children,
  className,
  data,
  ...rest
}: Props) {
  return (
    <div className={`fc-post-reply-notification ${className ?? ''}`} {...rest}>
      <div className="flex-row">
        <div className="flex-row flex-align-center">
          <div className="notification-type">
            <i className="fa-fw fas fa-heart"></i>
          </div>
          <div className="notification-avatar">
            <FCAccountAvatar className="avatar" account={data.user} />
          </div>
        </div>
        <div className="notification-content flex-row">
          <div className="flex-col-mobile">
            <FCAccountUsername
              className="user-name margin-right-text"
              maxLength={12}
              account={data.user}
            />

            <span>
              Replied to your <span className="bold blue-1 pointer">Post</span>
            </span>
          </div>
          <div className="notification-timestamp">
            <i className="fa-fw fas fa-circle time-dot"></i> {data.timestamp}
          </div>
        </div>
      </div>
    </div>
  )
}
