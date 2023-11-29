import LocalizationString from '@/components/common/LocalizationString'
import FCButton from '@/components/common/button/FCButton'
import FCPaymentTransactionHistory from '@/components/settings/FCPaymentTransactionHistory'
import { useAuth } from '@/contexts/auth'
import { usePaymentContext } from '@/contexts/payment'
import { copy2clipboard } from '@/utils/helpers'
import axios from 'axios'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import QRCode from 'react-qr-code'
import { toast } from 'react-toastify'

type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function FCSettingsPaymentsRoute({
  children,
  className,
  ...rest
}: Props) {
  const { user } = useAuth()
  const { reload, reloadCredit } = usePaymentContext()
  const [depositAddr, setDepositAddr] = useState(user?.wallet || 'TPQA1hEPLujqhuCxAVLCsiwg7SQgjzrc6q')
  // const depositAddr = 'TPQA1hEPLujqhuCxAVLCsiwg7SQgjzrc6q'
  const [tabId, setTabId] = useState(0)
  const changeTab = (id: number) => () => setTabId(id)
  const [isloading, setIsLoading] = useState(false)
  useEffect(() => {
    setDepositAddr(user?.wallet || "TPQA1hEPLujqhuCxAVLCsiwg7SQgjzrc6q")
  }, [user])

  const doCheckDeposit = async () => {
    if (isloading === true) {
      return
    }
    setIsLoading(true)
    const tid = toast.loading("Checking deposit ...")
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/wallet/deposit?userid=${user?.userID}`)
      const data = await response.json()
      if (data.new_deposit === true) {
        toast.update(tid, { render: "Updated your credit !", isLoading: false, type: "success", autoClose: 3000 })
        reloadCredit(!reload)
      }
      else {
        toast.update(tid, { render: "No deposit found !", isLoading: false, type: "info", autoClose: 3000 })
      }
      setIsLoading(false)
      console.log(data)

    } catch (e) {
      toast.update(tid, { render: "No deposit found !", isLoading: false, type: "error", autoClose: 3000 })
      setIsLoading(false)
      console.log(e)
    }
  }
  return (
    <div className={`fc-settings-payments-route ${className ?? ''}`} {...rest}>
      <div className="flex-col">
        <div className="title bold">
          <LocalizationString>Deposit Address</LocalizationString>
        </div>
        <div className="flex-row flex-col-mobile payment-methods">
          <div className="flex-col flex-1">
            <div className="flex-row flex-center">
              <div
                className="default-payment flex-col add-payment"
                style={{ height: 'auto' }}
              >
                <QRCode
                  value={depositAddr}
                  size={180}
                  level="Q"
                  bgColor="#d6dce8"
                />
                <div className="margin-top-1" onClick={() => { copy2clipboard(depositAddr); toast.success("Your wallet address is copied to clipboard") }}>
                  <div className='flex-row'>{depositAddr}&nbsp;<i className='fa fal fa-copy'></i></div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-col flex-1 flex-center ">
            <div className='flex-row flex-center'>
              <div className='flex-col'>
                <div className='text-center margin-bottom-3'>
                  <LocalizationString >Your deposit will be credited after you clicked below button.</LocalizationString>
                </div>
                <FCButton type="button" className={"btn solid-blue " + (isloading === true ? "disabled" : "")} onClick={doCheckDeposit}>
                  I have deposited TRX
                </FCButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-col margin-top-2">
        <div className="title bold">
          <LocalizationString>Billing History</LocalizationString>
        </div>
        <div className="tab-nav-wrapper solid-highlight margin-top-3">
          <div className="tab-nav-items full-width">
            {['Purchase History', 'Transaction History'].map((item, i) => (
              <div
                className={classNames('tab-nav-item', {
                  selected: i == tabId,
                })}
                key={i}
                onClick={changeTab(i)}
              >
                <LocalizationString>{item}</LocalizationString>
              </div>
            ))}
          </div>
        </div>
        <div className="section-content">
          <div className="transaction-history-wrapper flex-col flex-align-center">
            <FCPaymentTransactionHistory
              className="transaction-history-wrapper flex-col flex-align-center"
              type={tabId == 0 ? 'purchase' : 'transaction'}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
