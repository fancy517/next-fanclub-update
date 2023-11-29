import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import axios from 'axios'

const handler = async (req: NextRequest) => {
  try {
    const { email, password } = await req.json()

    const session_data = await get_session()
    console.log(session_data)
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`, {
      email,
      password,
      ip: session_data.ip,
      location: session_data.region + ", " + session_data.country
    })

    if (data && data.success) {
      cookies().set('token', data.token, {
        httpOnly: true,
        maxAge: 100 * 60, // 100 minutes
      })
      return NextResponse.json({ success: 'success' })
    }
  } catch (error) { }

  return NextResponse.json({ success: 'failed' })
}

const get_session = async () => {
  const { data } = await axios.get("https://ipinfo.io/json")
  return data
}
export { handler as POST }
