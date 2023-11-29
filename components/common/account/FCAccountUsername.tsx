import LocalizationString from '../LocalizationString'
import Link from 'next/link'
import { TAccount } from '@/types/account'
import { abbrString } from '@/utils/helpers'
import classNames from 'classnames'

type Props = {
  children?: React.ReactNode
  className?: string
  account: TAccount
  maxLength?: number
  showColumn?: boolean
  hideUsername?: boolean
  noInteraction?: boolean
  showVerifiedBadge?: boolean
  [x: string]: any
}

export default function FCAccountUsername({
  children,
  className,
  account,
  maxLength = 20,
  showColumn = false,
  hideUsername = false,
  noInteraction = false,
  showVerifiedBadge = true,
  ...rest
}: Props) {
  return (
    <div className={`fc-account-username ${className}`} {...rest}>
      <Link
        className={classNames(
          'username-wrapper',
          { 'col-name': showColumn },
          { 'no-interaction': noInteraction },
        )}
        href={`/${account.userName}`}
      >
        <div className="icon-wrapper flex-row flex-align-center">
          <span className="display-name">
            {abbrString(account.displayName? account.displayName : "", maxLength)}
          </span>

          {showVerifiedBadge && (
            <div className="tooltip">
              <span className="user-icon" style={{ color: 'var(--blue-1)' }}>
                <span className="fa-stack">
                  <i className="fa-fw fas fa-badge fa-stack-2x"></i>
                  <i className="fa-fw fas fa-check fa-stack-1x fa-inverse"></i>
                </span>
              </span>
            </div>
          )}

          <div className="tooltip"></div>
        </div>

        {!hideUsername && (
          <span className="user-name">
            {'@'}
            {abbrString(account.userName? account.userName : "", maxLength)}
            <div className="transparent-dropdown display-inline">
              <div className="dropdown-list">
                <div className="dropdown-item">
                  <i className="fal fa-fw fa-note-sticky pointer"></i>
                  Edit User Notes
                </div>
                <div className="dropdown-item">
                  <i className="fal fa-fw fa-list"></i>
                  Add to List
                </div>
                <div className="dropdown-item">
                  <i className="fa-fw fal fa-ban"></i>
                  <LocalizationString>Block user</LocalizationString>
                </div>
              </div>
            </div>
          </span>
        )}
      </Link>
    </div>
  )
}
