import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { TAccount } from '@/types/account'
import { mockAdmin, mockCreatorAccounts, mockUser } from '@/mock/users'
import axios from 'axios'

let user: TAccount = mockUser
const creator = mockCreatorAccounts[0]
const admin = mockAdmin

const handler = async (req: NextRequest) => {
  let token = cookies().get('token')?.value
  if (token === undefined || token === null) token = 'abc'
  console.log("token", token)
  try {
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/checktoken`, {
      token,
    })
    console.log(data)
    if (data.success === 'success') {
      user.userID = data.userid
      user.userName = data.username
      user.displayName = data.display_name
      user.email = data.email
      user.otpSecret = data.otp_secret
      user.otpEnabled = data.otp_enabled
      user.wallet = data.wallet
      user.availability = data.status
      user.avatarUrl = data.avatarUrl
      user.userType = data.usertype
      if (data.usertype === 'user') {
        return NextResponse.json({ success: true, ...user })
      }
      else if (data.usertype === 'creator') {
        // user.verified = true
        return NextResponse.json({ success: true, ...user })
      }
      else if (data.usertype === 'admin') {
        // user.admin = true
        return NextResponse.json({ success: true, ...user })
      }
      else if (data.usertype === 'needactivate')
        return NextResponse.json({ success: true, ...user })
    } else {
      return NextResponse.json({ success: false })
    }
    // if (token) {
    //   if (token == 'fansly100') {
    //     return NextResponse.json({ success: true, ...user })
    //   } else if (token == 'fansly200') {
    //     return NextResponse.json({ success: true, ...creator })
    //   } else if (token == 'fansly300') {
    //     return NextResponse.json({ success: true, ...admin })
    //   }
    // }
  } catch (error) {
    // console.log(error)
    return NextResponse.json({ success: false })
  }
}

export { handler as GET }
