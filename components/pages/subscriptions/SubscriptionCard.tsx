'use client'

import LocalizationString from '@/components/common/LocalizationString'
import FCAccountAvatar from '@/components/common/account/FCAccountAvatar'
import FCAccountBanner from '@/components/common/account/FCAccountBanner'
import FCAccountUsername from '@/components/common/account/FCAccountUsername'
import Dropdown from '@/components/common/dropdown'
import FCBalanceDisplay from '@/components/common/subscription/FCBalanceDisplay'
import useOutsideClick from '@/hooks/useOutsideClick'
import { TAccount } from '@/types/account'
import { TSubscriptionCard } from '@/types/subscription'
import { useRef, useState } from 'react'

type Props = {
  children?: React.ReactNode
  className?: string
  // account: TAccount
  card: TSubscriptionCard
  [x: string]: any
}

export default function SubscriptionCard({
  children,
  className,
  card,
  ...rest
}: Props) {
  const [open, setOpen] = useState(false)
  const trigger = useRef(null)
  const list = useRef(null)
  useOutsideClick(trigger, list, () => setOpen(false))

  console.log(card)
  return (
    <div className="subscription-card">
      <div className="banner">
        <FCAccountBanner className="banner-image" banner={card.creator.bannerUrl} />
      </div>
      <div className="flex-col relative">
        <div className="profile-image">
          <FCAccountAvatar className="avatar" account={card.creator} />
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

        <div className="profile-name">
          <FCAccountUsername
            maxLength={13}
            className="user-name"
            account={card.creator}
            showColumn={true}
          />
        </div>
      </div>

      <div className="flex-col subscription-details">
        <div className="flex-row flex-align-center">
          <i className="fa-fw fa fa-star margin-right-2"></i>
          <span className="margin-right-text">
            <LocalizationString>Subscription Tier</LocalizationString>:
          </span>
          {card.tiername}
        </div>
        <div className="flex-row flex-align-center">
          <i className="fa-fw fal fa-toggle-on margin-right-2"></i>
          <span>
            <LocalizationString>Status:</LocalizationString> {card.status}
          </span>
        </div>
        <div className="flex-row flex-align-center">
          <i className="fas fa-fw faw fa-calendar-star margin-right-2"></i>
          <span>
            <LocalizationString>Expiration Date: &nbsp;</LocalizationString>
            <LocalizationString>{card.expiration}</LocalizationString>
          </span>
        </div>
        {/* <div className="flex-row flex-align-center">
          <i className="fa-fw fas fa-droplet margin-right-2"></i>
          <span>
            <LocalizationString>Total Months Subscribed:</LocalizationString> 6
            Months
          </span>
        </div> */}
        <div>
          <div className="flex-row flex-align-center">
            <i className="fa-fw fas fa-dollar-sign margin-right-2"></i>
            <span>
              <LocalizationString className="margin-right-text">
                Subscription Price: &nbsp;
              </LocalizationString>
              <FCBalanceDisplay className="margin-right-text" balance={parseFloat(card.baseprice)} />
            </span>
          </div>
        </div>
        {/* <div className="flex-ro flex-align-centerw">
          <i className="fa-fw fas fa-rotate margin-right-2"></i>
        </div> */}
      </div>
    </div>
  )
}
