import { TSubscriptionPlans, TSubscriptionTier } from '@/types/subscription'

export const mockSubscriptionPlans: Array<TSubscriptionPlans> = [
  {
    id: '12',
    title: 'GUY SPOOK',
    primaryPlan: {
      duration: 1,
      price: 15,
    },
    bundle: [
      {
        duration: 3,
        price: 15,
      },
      {
        duration: 6,
        price: 15,
      },
    ],
    color: 'rgb(135,135,135)',
  },
  {
    title: 'shhh u my lover',
    primaryPlan: {
      duration: 1,
      price: 15,
    },
    bundle: [
      {
        duration: 3,
        price: 15,
      },
    ],
    color: 'rgb(210, 38, 225)',
  },
  {
    title: 'MY MASTER',
    primaryPlan: {
      duration: 1,
      price: 15,
    },
    color: 'rgb(79, 56, 247)',
  },
]

export const mockSubscriptionTiers: Array<TSubscriptionTier> = [
  {
    title: 'GUY SPOOK',
    plans: [
      {
        duration: 1,
        price: 15,
      },
      {
        duration: 3,
        price: 45,
      },
      {
        duration: 6,
        price: 90,
      },
    ],
    color: 'rgb(135,135,135)',
  },
  {
    title: 'shhh u my lover',
    plans: [
      {
        duration: 1,
        price: 20,
      },
      {
        duration: 2,
        price: 40,
      },
    ],
    color: 'rgb(210, 38, 225)',
  },
  {
    title: 'MY MASTER',
    plans: [
      {
        duration: 1,
        price: 50,
      },
    ],
    color: 'rgb(79, 56, 247)',
  },
]
