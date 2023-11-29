import httpProxy from 'http-proxy'
import Cookies from 'js-cookies'
import { NextRequest, NextResponse } from 'next/server'

const API_URL = process.env.API_URL

const proxy = httpProxy.createProxyServer()

const config = {
  api: {
    bodyParser: false,
  },
}

const handler = async (req: Request, res: Response) => {
  proxy
    .on('proxyRes', (proxyRes, req, res) => {
      let responseBody = ''
      proxyRes.on('data', (chunk) => {
        responseBody += chunk
      })

      proxyRes.on('end', () => {
        try {
          const { access_token } = JSON.parse(responseBody)
          const cookies = new Cookies(req, res)
          cookies.set('access-token', access_token, {
            httpOnly: true,
            sameSite: 'lax', // CSRF protection
          })

          return NextResponse.json({ loggedIn: true })

          // res.status(200).json({ loggedIn: true })
        } catch (error) {
          NextResponse.error()
        }
      })
    })
    .web(req, res)
  console.log('HTTP Response*************', res)
  return res
}

// export async function GET(request: NextRequest) {
//   return Response.json({ success: true })
// }
export { handler as GET, handler as POST, handler as PUT, handler as DELETE }
