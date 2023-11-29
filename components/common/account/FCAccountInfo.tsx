import Link from 'next/link'

import { TAccount } from '@/types/account'

import LocalizationString from '../LocalizationString'
import FCAccountAvatar from './FCAccountAvatar'
import FCAccountUsername from './FCAccountUsername'
import FCOnlineStatusController from './FCOnlineStatusController'
import { useState } from 'react'

type Props = {
  children?: React.ReactNode
  className?: string
  account: TAccount
  cb?: (status: string) => void
  [x: string]: any
}

export default function FCAccountInfo({
  children,
  className,
  account,
  cb,
  ...rest
}: Props) {
  const [loginaccount, setLoginAccount] = useState(account)
  console.log("login account", loginaccount)
  return (
    <div className="fc-account-info">
      <div className="creator-name-container">
        <div className="creator-avatar pointer">
          <FCAccountAvatar className="avatar" account={loginaccount} />
          <FCOnlineStatusController className="creator-avatar-dropdown" cb={(status: string) => {
            console.log(status);
            const _account: TAccount = account
            _account.availability = status
            console.log(_account)
            setLoginAccount(_account)
            cb && cb(status)
            // window.location.reload()
          }} />
        </div>
        <div className="creator-name pointer">
          <FCAccountUsername
            className="creator-alias"
            account={loginaccount}
            maxLength={10}
            showColumn={true}
          />
          <FCOnlineStatusController className="creator-avatar-dropdown" cb={(status: string) => {
            console.log(status);
            const _account: TAccount = account
            _account.availability = status
            setLoginAccount(_account)
            cb && cb(status)

            // window.location.reload()
          }} />
        </div>
      </div>
      <div className="creator-stats">
        <div className="creator-stat">
          <div className="creator-stat-value">1.4K</div>
          <div className="creator-stat-title">
            <LocalizationString>Likes</LocalizationString>
          </div>
        </div>
        <Link
          href={`/${account.userName}/followers`}
          className="creator-stat pointer blue-1-hover-only text-decoration-none"
        >
          <div className="creator-stat-value">1.6M</div>
          <div className="creator-stat-title">
            <LocalizationString>Followers</LocalizationString>
          </div>
        </Link>
        <div className="creator-stat">
          <div className="creator-stat-value">100</div>
          <div className="creator-stat-title">
            <LocalizationString>Subscribers</LocalizationString>
          </div>
        </div>
      </div>
    </div>
  )
}
