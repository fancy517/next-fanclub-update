type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

const purchaseOptions = [10, 25, 50, 100, 500]

export default function FCWalletBalanceShop({
  children,
  className,
  ...rest
}: Props) {
  return (
    <div className={`fc-wallet-balance-shop ${className ?? ''}`} {...rest}>
      {purchaseOptions.map((option, index) => (
        <div className="flex-row gem-purchase-option" key={index}>
          <div className="gem-amount">${option} Wallet Balance</div>
          <div className="flex-col">
            <div className="btn outline-dark-blue purchase-btn fixed-width-button">
              ${option}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
