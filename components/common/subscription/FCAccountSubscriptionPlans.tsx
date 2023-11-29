import { mockSubscriptionPlans } from '@/mock/subscription'
import SubscriptionPlans from './SubscriptionPlans'
import { TAccount } from '@/types/account'
import { Fragment } from 'react'
import { useEffect, useState } from 'react'
import { TSubscriptionPlans, TSubscriptionTier } from '@/types/subscription'
type Props = {
  children?: React.ReactNode
  className?: string
  account: TAccount
  [x: string]: any
}

export default function FCAccountSubscriptionPlans({
  children,
  className,
  account,
  ...rest
}: Props) {
  const [tierplans, setTierPlans] = useState<TSubscriptionPlans[]>([])
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/creator/tier/gettiers?username=${account.userName}`)
        const responseData = await response.json()
        const plans: TSubscriptionPlans[] = []
        responseData.forEach((tier: TSubscriptionTier) => {
          if (tier.active === "0") return
          const newbundle = []
          if (tier.month_two === "1") newbundle.push({ duration: 2, price: parseFloat(tier.base_price) })
          if (tier.month_three === "1") newbundle.push({ duration: 3, price: parseFloat(tier.base_price) })
          if (tier.month_six === "1") newbundle.push({ duration: 6, price: parseFloat(tier.base_price) })
          const newTier: TSubscriptionPlans = {
            id: tier.id,
            title: tier.tier_name,
            primaryPlan: {
              duration: 1,
              price: parseFloat(tier.base_price),
            },
            bundle: newbundle,
            color: tier.tier_color
          }
          plans.push(newTier)
        });
        setTierPlans(plans);
      } catch (err) {
        console.log(err)
      }
    }
    fetchdata()
  }, [account])
  return (
    <div
      className={`fc-account-subscription-plans ${className ?? ''}`}
      {...rest}
    >
      <div className="margin-top-1">
        {tierplans.map((plans, index) => (
          <Fragment key={index}>
            {index > 0 && <div className="seperator"></div>}
            <SubscriptionPlans plans={plans} account={account} />
          </Fragment>
        ))}
      </div>
    </div>
  )
}
