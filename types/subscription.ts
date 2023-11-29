import { TAccount } from "./account"

export type TSubscriptionPlans = {
  id: string,
  title: string
  primaryPlan: TSubscriptionPlan
  limited?: {
    end: string
  }
  bundle?: Array<TSubscriptionPlan>
  color: string
}

export type TSubscriptionPlan = {
  duration: number
  price: number
}

export type TSubscriptionTier = {
  id: string
  tier_name: string
  // plans: Array<TSubscriptionPlan>
  tier_color: string
  base_price: string
  month_two: string
  month_three: string
  month_six: string
  active: string
}

export type TSimpleAccount = {
  username: string,
  displayname: string,
  avatar: string
  banner: string
}

export type TSubscriptionCard = {
  creator: TAccount,
  tiername: string,
  status: string | "active" | "expired",
  expiration: string,
  baseprice: string,
}