type Props = {
  children?: React.ReactNode
  className?: string
  balance: number
  [x: string]: any
}

export default function FCBalanceDisplay({
  children,
  className,
  balance,
  ...rest
}: Props) {
  return (
    <div
      className={`fc-balance-display ${className ?? ''}`}
      style={{ display: 'inline' }}
      {...rest}
    >
      <i className="fal fa-dollar-sign"></i> {balance.toFixed(2)}
    </div>
  )
}
