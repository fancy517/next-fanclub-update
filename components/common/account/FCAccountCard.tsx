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

export default function FCAccountCard({
  children,
  className,
  account,
  ...rest
}: Props) {
  return (
    <div className={`fc-account-card ${className ?? ''}`} {...rest}>
      <div className="banner">
        <FCAccountBanner className="banner-image" />
      </div>

      <div className="flex-col">
        <div className="flex-row flex-align-center">
          <FCAccountAvatar className="avatar" account={account} />
          <div className="flex-1"></div>
          <div className="btn solid-blue fllow-button following-button">
            <span className="hover-hidden">
              <LocalizationString>Following</LocalizationString>
            </span>
            <span className="hover-visible">
              <LocalizationString>Unfollow</LocalizationString>
            </span>
          </div>
        </div>

        <FCAccountUsername
          maxLength={14}
          className="user-name"
          account={account}
        />
      </div>
      <div className="about-text">
        <span>
          <a
            href="https://fansly.com/redirect/external?url=https%3A%2F%2Fallmylinks.com%2Fboopppooo"
            target="_blank"
          >
            https://allmylinks.com/boopppooo
          </a>
          Feel me with fear. Fee...
        </span>
      </div>
      <div className="creator-stats">
        <div className="creator-stat">
          <div className="creator-stat-value">14K</div>
          <div className="creator-stat-title">
            <LocalizationString>Total Likes</LocalizationString>
          </div>
        </div>
        <div className="creator-stat">
          <div className="creator-stat-value">2.4K</div>
          <div className="creator-stat-title">
            <LocalizationString>Followers</LocalizationString>
          </div>
        </div>
      </div>
    </div>
  )
}
