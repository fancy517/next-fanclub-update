import { useContext, useEffect, useState } from "react";
import { createContext } from "react";

interface IPaymentContext {
    balance: number,
    setBalance: (bal: number) => void,
    reload: boolean,
    reloadCredit: (flag: boolean) => void
    // setCredit: () => void,
}

const PaymentContext = createContext<IPaymentContext | null>(null)

const PaymentWrapper = ({ children }: { children: React.ReactNode }) => {
    const [balance, setBalance] = useState(0.0)
    const [reload, setReload] = useState(false)
    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const data1 = await fetch(`${process.env.NEXT_PUBLIC_TRON_PRICE_URL}`)
                const _data1 = await data1.json()
                const tronPrice = _data1.Price
                // setBalance(tronPrice)
                setBalance(1)
            } catch (err) {
                console.error('Error fetching balance: ' + err)
            }
        }
        const timer = setInterval(fetchBalance, 10 * 60 * 1000)
        fetchBalance()

        return () => clearInterval(timer)
    }, []);


    return (
        <PaymentContext.Provider value={{ balance, setBalance: (bal: number) => setBalance(bal), reload, reloadCredit: (flag: boolean) => setReload(flag) }}>
            {children}
        </PaymentContext.Provider >
    )
}

const usePaymentContext = () => {
    const ctx = useContext(PaymentContext)
    if (!ctx) {
        throw new Error('Payment context does not exist')
    }
    return ctx
}

export { PaymentWrapper, usePaymentContext }