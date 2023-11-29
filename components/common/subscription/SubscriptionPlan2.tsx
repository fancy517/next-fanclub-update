import { TSubscriptionPlan } from '@/types/subscription'
import FCBalanceDisplay from './FCBalanceDisplay'

type Props = {
  children?: React.ReactNode
  className?: string
  title: string
  backgroundColor: string
  month: number
  price: string
  [x: string]: any
}

export default function SubscriptionPlan2({
  children,
  className = '',
  title,
  backgroundColor,
  month,
  price,
  ...rest
}: Props) {
  return (
    <div
      className="subscription-plan2 noselect"
      style={{ background: backgroundColor }}
    >
      <div className="subscription-title">
        <div className="flex-row flex-1 title-wrapper">
          <span className="eclipse margin-right-text">{title}</span>
          <span className="margin-right-text">For {month}</span>
          <span className="capitalize margin-right-text">month</span>
        </div>
      </div>
      <div className="subscription-price">
        <div className="subscription-price-text margin-right-text">
          <FCBalanceDisplay balance={parseFloat(price) * month} />
        </div>
      </div>
    </div>
  )
}
