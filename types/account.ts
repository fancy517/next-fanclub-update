// export type TAvailability = 'online' | 'invisible' | 'away'

export type TAccount = {
  userID?: string
  displayName: string
  userName: string
  email?: string
  otpSecret?: string
  otpEnabled?: number
  availability: string | 'online' | 'invisible' | 'away'
  avatarUrl?: string
  bannerUrl?: string
  location?: string
  twitterurl?: string
  instagramurl?: string
  tiktokurl?: string
  verified?: boolean
  userType?: string
  wallet?: string

  // Social
  likes?: number
  followers?: number
  aboutme?: string
}
