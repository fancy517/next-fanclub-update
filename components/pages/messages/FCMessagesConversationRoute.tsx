import FCAccountAvatar from '@/components/common/account/FCAccountAvatar'
import FCWalletBalance from '@/components/wallet/FCWalletBalance'
import FCWalletBalanceShop from '@/components/wallet/FCWalletBalanceShop'
import Link from 'next/link'
import MessageContentHeader from './MessageContentHeader'
import { TAccount } from '@/types/account'
import FCGroupMessageContainer from '../../message/FCGroupMessageContainer'

type Props = {
  children?: React.ReactNode
  className?: string
  account: TAccount
  [x: string]: any
}

export default function FCMessagesConversationRoute({
  children,
  className = '',
  account,
  ...rest
}: Props) {
  return (
    <div className={`fc-messages-conversation-route ${className}`} {...rest}>
      {/* begin message route header in mobile */}
      <div className="message-route-header sm-mobile-visible">
        <Link href="/messages" className="message-route-header-left">
          <i className="fa-solid fa-arrow-left"></i>
        </Link>
        <div className="message-route-header-center">
          <div className="user-account sm-mobile-visible">
            <div className="avatar-container pointer noselect">
              <FCAccountAvatar className="user-avatar" account={account} />
            </div>
          </div>
        </div>
        <div className="message-route-header-right">
          <div data-appxddropdown="" className="balance-dropdown">
            <FCWalletBalance
              // balanceOnly={true}
              className="balance-component noselect pointer"
            />
            <div className="dropdown-list width-19">
              <FCWalletBalanceShop />
            </div>
          </div>
        </div>
      </div>
      {/* end message route header */}

      <MessageContentHeader account={account} isMobile={true} />
      <MessageContentHeader account={account} isMobile={false} />

      <FCGroupMessageContainer className="message-content" account={account} />
    </div>
  )
}
