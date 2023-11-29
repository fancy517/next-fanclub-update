import '@/styles/modals/subscription_purchase_modal.scss'
import FCAccountBanner from '../common/account/FCAccountBanner'
import FCAccountAvatar from '../common/account/FCAccountAvatar'
import FCAccountUsername from '../common/account/FCAccountUsername'
import LocalizationString from '../common/LocalizationString'
import FCBalanceDisplay from '../common/subscription/FCBalanceDisplay'
import { TAccount } from '@/types/account'
import { useModalMeta } from '@/contexts/modal'
import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/auth'
import { toast } from 'react-toastify'

type Props = {
  children?: React.ReactNode
  className?: string
  data: {
    tierid: string,
    account: TAccount
    duration: string
  }
  [x: string]: any
}

export default function FCSubscriptionPurchaseModal({
  children,
  className = '',
  data,
  ...rest
}: Props) {
  const { tierid, duration, account } = data
  const { push, pop } = useModalMeta()

  const [tier_title, SetTierTitle] = useState("")
  const [tier_benefit, SetBenfits] = useState<string[]>([])
  const [tier_price, SetTierPrice] = useState<number>(0)
  const { user } = useAuth()
  // const [tier]
  const onPurchase = () => {
    console.log(user)
    if (!user) {
      toast.info("Please sign in to subscribe")
      return
    }
    push({
      id: 'orderconfirm',
      data: {
        tierid: tierid,
        duration: duration,
        totalprice: tier_price * parseInt(duration),
      },
    })

  }
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/creator/tier/getone?tierID=${tierid}`)
        const responsedata = await response.json()
        SetTierTitle(responsedata.tier_name)
        SetBenfits(responsedata.tier_benefit.split('\n'))
        SetTierPrice(parseFloat(responsedata.base_price))
      } catch (err) {
        console.log(err)
      }

    }
    fetchdata()
  }, [data])
  return (
    <div className={`fc-subscription-purchase-modal ${className}`} {...rest}>
      <div className="modal">
        <div className="modal-content">
          <div className="flex-0 flex-align-self-end overlay" onClick={() => pop()}>
            <i className="fa-fw fa fa-xmark pointer blue-1-hover-only margin-top-2 margin-right-2"></i>
          </div>
          <FCAccountBanner
            className="banner-image"
            banner={account.bannerUrl}
          />
          <FCAccountAvatar
            className="avatar"
            account={account}
            hideOnlineIndicator={true}
          />
          <FCAccountUsername
            className="user-name"
            account={account}
            showColumn={true}
          />

          <div className="font-size-lg text-center flex-col flex-align-center tier-title-header">
            <span className="bold font-size-xl eclipse max-100">{tier_title}</span>
            <LocalizationString>Subscription Benefits</LocalizationString>
          </div>
          <div className="subscription-benefits">
            <div className="flex-row">
              <i className="fa-fw fa fa-check"></i>
              <div className="flex-row flex-wrap">
                <LocalizationString className="margin-right-text">
                  Full access to the content of Subscription Tier:
                </LocalizationString>
                <span className="bold wrap-text">&nbsp;{tier_title}</span>
              </div>
            </div>
            <div>
              <i className="fa-fw fa fa-check"></i>
              <LocalizationString>
                Cancel your subscription at any time
              </LocalizationString>
            </div>
            {tier_benefit.map((benefit, key) => (
              <div key={key}>
                <i className="fas fa-stars flex-0 blue-1"></i>
                <div className="flex-row flex-wrap wrap-text">
                  <span>{benefit} </span>
                </div>
              </div>
            ))}
          </div>
          <div
            className="btn solid-blue large purchase-btn"
            style={{
              background: 'rgb(135, 135, 135)',
              borderColor: 'rgb(135, 135, 135)',
            }}
            onClick={onPurchase}
          >
            <LocalizationString className="margin-right-text">
              Subscribe for
            </LocalizationString>{' '}
            <FCBalanceDisplay balance={tier_price * parseInt(duration)} />
            <LocalizationString>&nbsp;&nbsp;{''}&nbsp;&nbsp;{duration}</LocalizationString>{' '}
            <LocalizationString>month(s)</LocalizationString>
          </div>

          <div className="dark-blue-1 padding-top-2 padding-right-3 padding-left-3 text-center font-size-xs">
            <LocalizationString className="margin-right-text">
              If you have
            </LocalizationString>
            <FCBalanceDisplay balance={tier_price * parseInt(duration)} />
            <LocalizationString>
              &nbsp;balance, you will be charged there instead. When you run out of
              balance at the end of the billing cycle and if renew is on, your
              default payment method will be charged instead.
            </LocalizationString>
          </div>
        </div>
      </div>
    </div>
  )
}
