import { useState } from 'react'
import FCBalanceInput from '../common/editor/FCBalanceInput'
import FCBalanceDisplay from '../common/subscription/FCBalanceDisplay'

type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function FCTipAttachmentPreview({
  children,
  className = '',
  ...rest
}: Props) {
  const [balance, setBalance] = useState('')
  return (
    <div className={`fc-tip-attachment-preview ${className}`} {...rest}>
      <div>
        <div className="flex-col margin-top-1">
          <div className="relative">
            <FCBalanceInput value={balance} onChange={(s) => setBalance(s)} />
            <div className="vat-overlay">
              <div className="dark-blue-1">
                +
                <FCBalanceDisplay balance={0.2} />
                (VAT)
              </div>
            </div>
          </div>
          <div className="flex-row font-size-sm dark-blue-1 margin-top-text">
            <div className="flex-1"></div>
            <div>
              Total:
              <span className="bold">
                <FCBalanceDisplay balance={1.2} />
              </span>
              including VAT Austria (20%)
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
