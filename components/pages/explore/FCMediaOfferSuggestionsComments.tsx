import FCPostReply from '@/components/common/feed/FCPostReply'
import FCPostCreation from '@/components/post/FCPostCreation'
import { TAccount } from '@/types/account'

type Props = {
  children?: React.ReactNode
  className?: string
  account: TAccount
  onClose: () => void
  [x: string]: any
}

export default function FCMediaOfferSuggestionsComments({
  children,
  className = '',
  account,
  onClose,
  ...rest
}: Props) {
  return (
    <div
      className={`fc-media-offer-suggestions-comments ${className}`}
      {...rest}
    >
      <div className="post-replies-header">
        <div className="icon-left flex-0"></div>
        <div className="flex-1 text-center">
          Comments <span className="semi-bold">(22)</span>
        </div>
        <div className="icon-right flex-0" onClick={onClose}>
          <i className="fa fa-times blue-1-hover-only pointer"></i>
        </div>
      </div>

      <div className="post-replies">
        {[1, 2, 3].map((reply) => (
          <FCPostReply account={account} />
        ))}
      </div>

      <div className="post-replies-add">
        <FCPostCreation account={account} displayMode={4} />
      </div>
    </div>
  )
}
