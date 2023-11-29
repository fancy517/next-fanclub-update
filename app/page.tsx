// 'use client'
import FCFeedRoute from '@/components/pages/feed/FCFeedRoute'
import FCLandingPage from '@/components/pages/landing/FCLandingPage'
import { cookies } from 'next/headers'
import axios from 'axios'
import FCUserVerificationCode from '@/components/pages/users/FCUserVerificationCode'
import { redirect } from 'next/navigation'
export default async function HomePage() {

  let token = cookies().get('token')?.value
  if (token === undefined || token === null) {
    token = 'abc'
  }
  try {
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/checktoken`, {
      token,
    })

    if (data.usertype == 'needactivate') {
      return <FCUserVerificationCode />
    }
    if (data.success == 'success') {
      return <FCFeedRoute />
    } else return <FCLandingPage />
  } catch (e) {
    console.log(e)
    return <FCLandingPage />
  }
}
