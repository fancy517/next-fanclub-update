import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'


const handler = async (req: NextRequest) => {
    try {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/wallet/deposit`)
        console.log("data: ", data)
        if (data.new_deposit === false) {
            return NextResponse.json({ success: 'no_deposit' })
        } else if (data.new_deposit === true) {
            return NextResponse.json({ success: "success", balance: data.balance })
        } else {
            return NextResponse.json({ success: "failed" })
        }

    } catch (error) {
        console.error(error)
        return NextResponse.json({ success: error })
    }
}

export { handler as POST }