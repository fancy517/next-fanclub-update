import { TAccount } from '@/types/account'
import FCGroupMessageCollection from './FCGroupMessageCollection'
import FCGroupMessageInput from './FCGroupMessageInput'
import { useState } from 'react'

type Props = {
  children?: React.ReactNode
  className?: string
  account: TAccount
  [x: string]: any
}

export default function FCGroupMessageContainer({
  children,
  className = '',
  account,
  ...rest
}: Props) {
  const [replyingId, setReplyingId] = useState('')

  return (
    <div className={`fc-group-message-container ${className}`} {...rest}>
      <div data-xdscrollwatcher="" className="message-content-list">
        <div data-xdmutation="" className="message-collection-wrapper">
          {[1, 2].map((x) => (
            <FCGroupMessageCollection
              className="message-collection"
              key={x}
              onReply={(id: string) => setReplyingId(id)}
            />
          ))}
        </div>
      </div>

      <FCGroupMessageInput
        account={account}
        replying={replyingId != ''}
        onCloseReply={() => setReplyingId('')}
      />
    </div>
  )
}
