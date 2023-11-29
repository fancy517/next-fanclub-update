import '@/styles/modals/product_order_confirm.scss'
import FCBalanceDisplay from '../common/subscription/FCBalanceDisplay'
import { useModalMeta } from '@/contexts/modal'
import { useAuth } from '@/contexts/auth'
import { toast } from 'react-toastify'

type Props = {
  children?: React.ReactNode
  className?: string
  data: {
    tierid: string,
    duration: string,
    totalprice: number,
  }
  [x: string]: any
}

export default function FCProductOrderConfirmModal({
  children,
  className = '',
  data,
  ...rest
}: Props) {
  const { user } = useAuth()
  const { pop } = useModalMeta()
  const { tierid, duration, totalprice } = data
  const onClose = () => {
    pop()
  }
  const onPurchase = async () => {
    if (!user) {
      toast.info("Please sign in to subscribe")
      return
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/subscribe_tier?tierid=${tierid}&duration=${duration}&userid=${user.userID}`)
      const responsedata = await response.json()
      console.log(responsedata)
      if (responsedata === "success") {
        toast.success("you have successfully subscribed")
        const timeoutId = setTimeout(() => {
          window.location.reload()
        }, 2000); // 3000 milliseconds = 3 seconds
        return () => clearTimeout(timeoutId);
        // pop()
      } else if (responsedata === "low balance") {
        toast.warning("you haven't engough balance to subscribe")
      }
    } catch (e) {
      console.error(e)
    }
  }
  return (
    <div className={`fc-product-order-confirm-modal ${className}`} {...rest}>
      <div className="modal">
        <div className="modal-header">
          <div className="flex-col title">Confirm your Order</div>
        </div>
        <div className="modal-content">
          <div className="flex-col margin-top-3">
            <div className="flex-row">
              <div className="flex-1">Subscription</div>

              <div className="flex-0">
                <FCBalanceDisplay balance={totalprice} />
              </div>
            </div>
            <div className="flex-row bold blue-1 margin-top-3">
              <div className="flex-1 text-right margin-right-text">Total</div>
              <div className="flex-0">
                <FCBalanceDisplay balance={(totalprice)} />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="font-size-sm margin-top-2">
          You can pay with a saved payment method, or add new methods
          <span
            routerlink="/settings/payments"
            className="blue-1 pointer"
            tabindex="0"
          >
            here.
          </span>
        </div> */}
        {/* <label className="margin-top-3 bold font-size-sm">
          <xd-localization-string _nghost-ng-c2905135316="">
            Pay with saved method
          </xd-localization-string>
        </label> */}
        <div className="flex-row flex-justify-end margin-top-4">
          <div className="btn large margin-right-2" onClick={onClose}>
            Close
          </div>
          <div className="btn solid-blue large " onClick={onPurchase}>
            Subscribe
          </div>
        </div>
      </div>
    </div>
  )
}
