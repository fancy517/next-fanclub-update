import { TAccount } from '@/types/account'

import LocalizationString from '../LocalizationString'
import FCAccountAvatar from './FCAccountAvatar'
import FCAccountBanner from './FCAccountBanner'
import FCAccountUsername from './FCAccountUsername'

type Props = {
  children?: React.ReactNode
  className?: string
  account: TAccount
  [x: string]: any
}

export default function FCSuggestedAccount({
  children,
  className,
  account,
  ...rest
}: Props) {
  return (
    <div className={`fc-suggested-account ${className ?? ''}`} {...rest}>
      <div className="feed-suggestion-header">
        <FCAccountBanner banner={account.bannerUrl} />
        <FCAccountAvatar
          className="feed-creator-avatar"
          account={account}
          statusMode={4}
        />

        <div className="feed-creator-col">
          <div className="feed-creator-name-wrapper">
            <div className="feed-creator-name">
              <FCAccountUsername account={account} showColumn={true} />
            </div>
          </div>
        </div>

        <div className="btn solid-blue fllow-button wider bold font-size-xs">
          <LocalizationString>Follow</LocalizationString>
        </div>
      </div>
    </div>
  )
}
