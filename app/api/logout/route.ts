import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const db = [
  { email: 'user@mail.com', password: '123', token: 'fansly100' },
  { email: 'creator@mail.com', password: '123', token: 'fansly200' },
  { email: 'admin@mail.com', password: '123', token: 'fansly300' },
]

const handler = async (req: NextRequest) => {
  cookies().set('token', '', {
    httpOnly: true,
    maxAge: 0, 
  })

  return NextResponse.json({})
}

export { handler as POST }
