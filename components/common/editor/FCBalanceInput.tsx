import LocalizationString from '../LocalizationString'

type Props = {
  children?: React.ReactNode
  className?: string
  value: string
  onChange: (s: string) => void
  size?: 'small' | 'medium'
  [x: string]: any
}

export default function FCBalanceInput({
  children,
  className,
  value,
  onChange,
  size = 'medium',
  ...rest
}: Props) {
  return (
    <div className={`fc-balance-input ${className ?? ''}`} {...rest}>
      {size == 'medium' ? (
        <div className="material-input icon-right">
          <div className="icon-right solid" style={{ fontSize: '0.9em' }}>
            TRX
          </div>
          <input
            type="text"
            value={value}
            required
            onChange={(e) => onChange(e.target.value)}
            className="conversionHidden ng-untouched ng-pristine ng-valid"
          />
          <div className="label">
            <LocalizationString>Amount</LocalizationString>
          </div>
          <div className="placeholder">
            <LocalizationString>Enter Amount</LocalizationString>
          </div>
        </div>
      ) : (
        <div className="flex-row transparent flex-align-center">
          <div>$</div>
          <input
            type="text"
            value={value}
            required
            onChange={(e) => onChange(e.target.value)}
            className="conversionHidden ng-untouched ng-pristine ng-valid"
          />
        </div>
      )}
    </div>
  )
}
