import { TSubscriptionPlan } from '@/types/subscription'
import FCBalanceDisplay from './FCBalanceDisplay'
import { useModalMeta } from '@/contexts/modal'
import { TAccount } from '@/types/account'

type Props = {
  id: string
  title: string
  plan: TSubscriptionPlan
  backgroundColor: string
  account: TAccount
  //   children?: React.ReactNode;
  //   className?: string;
  //   [x: string]: any;
}

export default function SubscriptionPlan({
  id,
  title,
  plan,
  account,
  backgroundColor,
}: Props) {
  const { push } = useModalMeta()
  const onPurchase = () => {
    push({
      id: 'subscribe',
      data: {
        tierid: id,
        duration: plan.duration,
        account,
      },
    })
  }
  return (
    <div
      className="subscription-plan noselect three-month"
      style={{ background: backgroundColor }}
      onClick={onPurchase}
    >
      <div className="subscription-title">
        <div className="flex-row flex-1 title-wrapper">
          <span className="eclipse margin-right-text">{title}</span>
          <span className="margin-right-text">{plan.duration}</span>
          <span className="capitalize margin-right-text">month</span>
        </div>
      </div>
      <div className="subscription-price">
        <div className="subscription-price-text margin-right-text">
          <FCBalanceDisplay balance={plan.price * plan.duration} />
        </div>
      </div>
    </div>
  )
}
