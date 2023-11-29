import { useAuth } from "@/contexts/auth"
import { usePaymentContext } from "@/contexts/payment"
import { useEffect, useState } from "react"

type Props = {
  children?: React.ReactNode
  className?: string
  balanceOnly?: boolean
  [x: string]: any
}

export default function FCWalletBalance({
  children,
  className,
  ...rest
}: Props) {
  const { user } = useAuth()
  const [credit, setCredit] = useState("0")
  const { balance, reload } = usePaymentContext()
  useEffect(() => {
    const fetchBalance = async () => {
      if (!user) return
      try {
        const data = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/wallet/get_balance?userid=${user?.userID}`)
        const _balance = await data.json()

        setCredit((_balance * 1).toFixed(2))
      } catch (err) {
      }
    }
    fetchBalance()
    // setInterval(fetchBalance, 10 * 60 * 1000)
  }, [user, balance, reload])
  return (
    <div
      //   balanceonly="true"
      className={`fc-wallet-balance ${className}`}
      {...rest}
    >
      <div>
        <span>$</span>&nbsp;{credit}
      </div>
    </div>
  )
}
