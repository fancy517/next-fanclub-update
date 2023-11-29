import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import axios from 'axios'

const handler = async (req: NextRequest) => {
  try {
    const { email, signupEmail, password } = await req.json()
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/signup`, {
      email,
      signupEmail,
      password,
    })
    if (data == 'success') {
      // const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`, {
      //   email: signupEmail,
      //   password: password,
      // })
      // if (data && data.success) {
      //   cookies().set('token', data.token, {
      //     httpOnly: true,
      //     maxAge: 100 * 60, // 10 minutes
      //   })
      //   return NextResponse.json({ success: 'success' })
      // }
      return NextResponse.json({ success: "success" })
    } else if (data == 'exist') {
      return NextResponse.json({ success: 'exist' })
    } else {
      return NextResponse.json({ success: 'failed' })
    }
  } catch (error) { }

  return NextResponse.json({ success: 'failed' })
}

export { handler as POST }
