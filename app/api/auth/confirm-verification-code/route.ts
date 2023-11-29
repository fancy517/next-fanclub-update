import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import { cookies } from 'next/headers'

const handler = async (req: NextRequest) => {
  try {
    const { vcode } = await req.json()
    let token = cookies().get('token')?.value
    if (token === undefined || token === null) {
      token = ''
    }

    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/confirm_verification_code`,
      { token: token, activation_code: vcode },
    )
    if (data) {
      return NextResponse.json({ success: 'success' })
    } else {
      return NextResponse.json({ success: 'false' })
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json({ success: 'failed' })
  }
}

export { handler as POST }
