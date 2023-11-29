import SubscriptionTierBox from '@/components/common/subscription/SubscriptionTierBox'
import { useModalMeta } from '@/contexts/modal'
import { mockSubscriptionPlans, mockSubscriptionTiers } from '@/mock/subscription'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/auth'
import { TSubscriptionTier } from '@/types/subscription'
import { toast } from 'react-toastify'

type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function DashboardPlans({
  children,
  className = '',
  ...rest
}: Props) {
  const { push } = useModalMeta()
  const showCreateModal = () => {
    push({
      id: 'subscriptiontiercreate',
      data: {
        cb: () => SetIsReload(!isreload),
      }
    })
  }
  const { user } = useAuth()
  const [tiers, setTiers] = useState<TSubscriptionTier[]>([])
  const [isreload, SetIsReload] = useState(false)

  useEffect(() => {
    if (!user) {
      return
    }
    const fetchTiers = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/creator/tier/gettiers?username=${user?.userName}`)
        const responseData = await response.json()
        console.log(responseData)
        setTiers(responseData)
      } catch (error) {
        toast.warning("Error Occured")
        console.log(error);
      }
    }
    fetchTiers();
  }, [user, isreload])


  return (
    <div
      className={`dashboard-plan-route padding-left-3 padding-right-3 ${className}`}
      {...rest}
    >
      <h4 className="title">Your active subscription plans</h4>
      <span className="description">
        These are your setup subscription plans as displayed on your profile.
        Click on edit to modify pricing, billing cycle and promotions.
      </span>

      <div className="subscription-plans-container" style={{ marginTop: "20px" }}>
        {tiers.map((tier, i) => (
          <SubscriptionTierBox className={"status" + tier.active} key={i} tier={tier} cb={() => { SetIsReload(!isreload) }} />
        ))}
      </div>

      <h4 className="title">Create New Subscription Tier</h4>
      <span className="description">
        These are your setup subscription plans as displayed on your profile.
        Click on edit to modify pricing, billing cycle and promotions.
      </span>
      <div className="flex-row">
        <div className="btn outline-blue" onClick={showCreateModal}>
          Create New Subscription Tier
        </div>
      </div>
    </div>
  )
}
