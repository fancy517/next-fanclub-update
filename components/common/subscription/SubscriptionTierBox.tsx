import { TSubscriptionTier } from '@/types/subscription'
import SubscriptionPlan from './SubscriptionPlan'
import SubscriptionPlan2 from './SubscriptionPlan2'
import { useModalMeta } from '@/contexts/modal'
import { toast } from 'react-toastify'

type Props = {
  children?: React.ReactNode
  className?: string
  tier: TSubscriptionTier
  cb: () => void
  [x: string]: any
}

export default function SubscriptionTierBox({
  children,
  className = '',
  tier,
  cb,
  ...rest
}: Props) {
  const { push } = useModalMeta()
  const showEditModal = () => {
    push({ id: 'subscriptiontieredit', data: { tierID: tier.id, cb: () => { cb() } } })
  }
  const toggleTier = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/creator/tier/toggletier?id=${tier.id}`)
      const responseData = await response.json()
      if (responseData === "success") {
        cb()
      } else {
        toast.error("Error Occured")
      }
    } catch (err) {
      console.log(err)
      toast.error("Error Occured")
    }
  }

  return (
    <div className={`subscription-tier-box  ${className}`} {...rest}>
      <div className="subscription-tier-title">{tier.tier_name}</div>

      <SubscriptionPlan2
        title={tier.tier_name}
        backgroundColor={tier.tier_color}
        month={1}
        price={tier.base_price}
      />
      {(tier.month_two === "1") && (
        <SubscriptionPlan2
          title={tier.tier_name}
          backgroundColor={tier.tier_color}
          month={2}
          price={tier.base_price}
        />
      )}
      {(tier.month_three === "1") && (
        <SubscriptionPlan2
          title={tier.tier_name}
          backgroundColor={tier.tier_color}
          month={3}
          price={tier.base_price}
        />
      )}
      {(tier.month_six === "1") && (
        <SubscriptionPlan2
          title={tier.tier_name}
          backgroundColor={tier.tier_color}
          month={6}
          price={tier.base_price}
        />
      )}

      <div className="subscription-tier-actions">
        <div className="btn outline-blue" style={{ backgroundColor: tier.tier_color, border: "none" }} onClick={showEditModal}>
          <i className="fa fa-pencil" /> &nbsp;Edit Subscription Tier
        </div>

        {tier.active === "1" ? (
          <div className="btn outline-red" onClick={toggleTier}>
            Disable
          </div>
        ) : (
          <div className="btn outline-blue" onClick={toggleTier}>
            Active
          </div>
        )}
      </div>
    </div>
  )
}
