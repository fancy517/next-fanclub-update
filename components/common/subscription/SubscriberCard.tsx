import { TAccount } from '@/types/account'
import FCAccountAvatar from '../account/FCAccountAvatar'
import FCAccountUsername from '../account/FCAccountUsername'
import LocalizationString from '../LocalizationString'
import FCBalanceDisplay from './FCBalanceDisplay'

type Props = {
  children?: React.ReactNode
  className?: string
  account: TAccount
  [x: string]: any
}

export default function SubscriberCard({
  children,
  className = '',
  account,
  ...rest
}: Props) {
  return (
    <div className={`subscriber-card ${className}`} {...rest}>
      <div className="flex-row relative subscriber-head">
        <div className="profile-image">
          <FCAccountAvatar className="avatar" account={account} />
        </div>

        <div className="profile-name">
          <FCAccountUsername
            maxLength={13}
            className="user-name"
            account={account}
            showColumn={true}
          />
        </div>

        {/* <Dropdown className="transparent-dropdown" open={open}>
          <div
            className="dropdown-title sub-settings"
            onClick={() => setOpen(!open)}
            ref={trigger}
          >
            <i className="fa-fw fa fa-gear"></i>
          </div>
          <div className="dropdown-list" ref={list}>
            <div data-routerlink="/settings/payments" className="dropdown-item">
              <i className="fa-fw fal fa-credit-card-blank"></i>
              <span>
                <LocalizationString>Change Payment Method</LocalizationString>
              </span>
            </div>
            <div className="dropdown-item">
              <i className="fa-fw fal fa-user-xmark"></i>
              <span>
                <LocalizationString>
                  Don&apos;t Renew Subscription
                </LocalizationString>
              </span>
            </div>
          </div>
        </Dropdown> */}
      </div>

      <div className="flex-col subscription-details">
        <div className="flex-row flex-align-center">
          <i className="fa-fw fa fa-star margin-right-2"></i>
          <span className="margin-right-text">
            <LocalizationString>Subscription Tier</LocalizationString>:
          </span>
          Subscription
        </div>
        <div className="flex-row flex-align-center">
          <i className="fa-fw fal fa-toggle-on margin-right-2"></i>
          <span>
            <LocalizationString>Status:</LocalizationString> expired
          </span>
        </div>
        <div className="flex-row flex-align-center">
          <i className="fas fa-fw faw fa-calendar-star margin-right-2"></i>
          <span>
            <LocalizationString>Billing Cycle:</LocalizationString> 1
            <LocalizationString>month</LocalizationString>
          </span>
        </div>
        <div className="flex-row flex-align-center">
          <i className="fa-fw fas fa-droplet margin-right-2"></i>
          <span>
            <LocalizationString>Total Months Subscribed:</LocalizationString> 6
            Months
          </span>
        </div>
        <div>
          <div className="flex-row flex-align-center">
            <i className="fa-fw fas fa-dollar-sign margin-right-2"></i>
            <span>
              <LocalizationString className="margin-right-text">
                Subscription Price:
              </LocalizationString>
              <FCBalanceDisplay className="margin-right-text" balance={9.99} />
            </span>
          </div>
        </div>
        <div className="flex-ro flex-align-centerw">
          {/* <i className="fa-fw fas fa-rotate margin-right-2"></i> */}
          <i className="fa-fw fal fa-circle-pause margin-right-2"></i>Paused
        </div>
      </div>
    </div>
  )
}
