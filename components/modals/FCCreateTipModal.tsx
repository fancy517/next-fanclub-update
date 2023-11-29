import '@/styles/modals/create_tip.scss'
import LocalizationString from '../common/LocalizationString'
import FCAccountAvatar from '../common/account/FCAccountAvatar'
import FCAccountUsername from '../common/account/FCAccountUsername'
import FCBalanceInput from '../common/editor/FCBalanceInput'
import { TAccount } from '@/types/account'
import { useModalMeta } from '@/contexts/modal'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useAuth } from '@/contexts/auth'
import { usePaymentContext } from '@/contexts/payment'

type Props = {
  children?: React.ReactNode
  className?: string
  data: {
    account: TAccount
    tip_type: string
    postid?: string
  }
  [x: string]: any
}

export default function FCCreateTipModal({
  children,
  className = '',
  data,
  ...rest
}: Props) {
  const { account, tip_type, postid } = data
  const { user } = useAuth()
  const { pop } = useModalMeta()
  const [amount, setAmount] = useState('')
  const [text, setText] = useState('')
  const { reload, reloadCredit } = usePaymentContext()

  const isBelowMinTipAmount = amount != '' && Number(amount) < 0.1
  const isInsufficientBalance = false

  const sendTip = async () => {
    if (Number(amount) <= 0 || Number.isNaN(Number(amount))) { toast.warning("Please enter a valid amount"); return }
    if (tip_type === "POST") {
      try {
        const sendata = {
          userid: Number(user?.userID),
          postid: Number(postid),
          amount: parseFloat(amount),
          text: text
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/user/tip_post`, {
          method: "POST",
          body: JSON.stringify(sendata)
        })
        const data = await response.json()
        if (data === "success") {
          toast.success("You have tipped the post")
          reloadCredit(!reload)
          pop()
        } else if (data === "low_amount") {
          toast.error("You haven't enough balance to tip")
        } else {
          toast.error("Failed to tip the post")
        }
      } catch (err) {
        toast.error("Server Error")
        console.log(err)
      }
    } else {
      try {
        const sendata = {
          userid: Number(user?.userID),
          creator: Number(account.userID),
          amount: parseFloat(amount),
          text: text
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/user/tip_creator`, {
          method: "POST",
          body: JSON.stringify(sendata)
        })
        const data = await response.json()
        if (data === "success") {
          toast.success("You have tipped the creator")
          reloadCredit(!reload)
          pop()
        } else if (data === "low_amount") {
          toast.error("You haven't enough balance to tip")
        } else {
          toast.error("Failed to tip the creator")
        }
      } catch (err) {
        toast.error("Server Error")
        console.log(err)
      }
    }
  }

  return (
    <div className={`fc-create-tip-modal ${className}`} {...rest}>
      <div className="modal">
        <div className="modal-header">
          <div className="title flex-1">
            <LocalizationString>Send a Tip</LocalizationString>
          </div>
          <div className="actions blue-1-hover-only" onClick={pop}>
            <i className="fa-fw fa fa-xmark pointer"></i>
          </div>
        </div>
        <div className="modal-content flex-col flex-1">
          <div className="dark-blue-1 flex-row flex-align-center flex-wrap">
            <div>
              <LocalizationString>
                How much would you like to tip to
              </LocalizationString>
            </div>
            <div className="flex-row flex-align-center margin-top-1">
              <FCAccountAvatar account={account} hideOnlineIndicator={true} />
              <FCAccountUsername account={account} hideUsername={true} />
            </div>
          </div>
          <div className="flex-col margin-top-1">
            <div className="relative">
              <FCBalanceInput value={amount} onChange={(s) => setAmount(s)} />
            </div>
          </div>
          <div className="material-input">
            <textarea
              rows={2}
              required={true}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="ng-untouched ng-pristine ng-invalid"
            ></textarea>
            <div className="label">
              <LocalizationString>Type a message... </LocalizationString>
            </div>
          </div>

          {isBelowMinTipAmount && (
            <div className="red-1 margin-top-2">
              You can not tip less than $0.10.
            </div>
          )}

          {isInsufficientBalance && (
            <div className="red-1 margin-top-2">
              You do not have enough balance for this tip amount
            </div>
          )}

          <div className="flex-row flex-end margin-top-4">
            <div className="more-gems-padding"></div>
            <div className="button-container">
              <div
                className="btn bold solid-blue wider margin-right-1"
                onClick={sendTip}
              >
                <LocalizationString>Tip</LocalizationString>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
