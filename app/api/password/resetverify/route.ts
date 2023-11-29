import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import { cookies } from 'next/headers'

const handler = async (req: NextRequest) => {
  try {
    const { code, new_password } = await req.json()
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/reset-password`,
      { code, new_password },
    )
    if (data) {
      return NextResponse.json({ success: data })
    } else {
      return NextResponse.json({ success: 'failed' })
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json({ success: 'failed' })
  }
}

export { handler as POST }
