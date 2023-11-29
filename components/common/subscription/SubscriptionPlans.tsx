'use client'

import { useState } from 'react'
import SubscriptionPlan from './SubscriptionPlan'
import { TSubscriptionPlans } from '@/types/subscription'
import { TAccount } from '@/types/account'

type Props = {
  children?: React.ReactNode
  className?: string
  plans: TSubscriptionPlans
  account: TAccount
  [x: string]: any
}

export default function SubscriptionPlans({ plans, account }: Props) {
  const [showAdditionalPlans, setShowAdditionalPlans] = useState(false)

  const switchAdditional = () => {
    setShowAdditionalPlans(!showAdditionalPlans)
  }

  return (
    <div className="subscription-plans">
      <div className="flex-col flex-wrap">
        <div className="subscription-tier-title eclipse margin-right-text">
          {plans.title}
        </div>

        <SubscriptionPlan
          id= {plans.id}
          title={plans.title}
          plan={plans.primaryPlan}
          backgroundColor={plans.color}
          account={account}
        />

        {plans.bundle && (
          <div className="flex-col sub-bundles">
            <div
              className="bold margin-left-text flex-row bundles-header pointer"
              onClick={switchAdditional}
            >
              <div className="flex-1">
                <i className="fa-fw fal fa-tags margin-right-text"></i>
                <span>Additional Plans</span>
              </div>
              <div className="flex-0 collapse-action">
                <i className="fa-fw fal fa-chevron-down"></i>
              </div>
            </div>

            {showAdditionalPlans && (
              <div className="bundles-container flex-col">
                {plans.bundle.map((plan, index) => (
                  <SubscriptionPlan
                    key={index}
                    id={plans.id}
                    title={plans.title}
                    plan={plan}
                    account={account}
                    backgroundColor={plans.color}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="subscription-plan"></div>
    </div>
  )
}
