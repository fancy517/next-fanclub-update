import LocalizationString from '@/components/common/LocalizationString'
import FCBalanceDisplay from '@/components/common/subscription/FCBalanceDisplay'

type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function FCDMPermissionFlagsDisplay({
  children,
  className = '',
  ...rest
}: Props) {
  return (
    <div className={`fc-dm-permission-flags-display ${className}`} {...rest}>
      <div className="permission-container">
        <div className="flex-row flex-align-center permission-option selectable">
          <div className="flex-1 flex-wrap overflow-hidden flex-start flex-row flex-wrap flex-align-center">
            <div className="flex-row flex-wrap flex-align-center permission-flag capitalize max-100">
              <span>
                <LocalizationString>Price per Message</LocalizationString>
              </span>
              <span className="margin-left-text">
                <span className="gem-amount">
                  <FCBalanceDisplay balance={1} />
                </span>
              </span>
            </div>
          </div>
          <div className="btn solid-blue">
            <LocalizationString className="margin-right-text">
              Select
            </LocalizationString>
            <FCBalanceDisplay balance={1} />
            <LocalizationString>p/m</LocalizationString>
          </div>
        </div>
      </div>
      <div className="permission-container">
        <div className="flex-row flex-align-center permission-option">
          <div className="flex-1 flex-wrap overflow-hidden flex-start flex-row flex-wrap flex-align-center">
            <div className="flex-row overflow-hidden flex-align-center permission-flag capitalize max-100">
              <LocalizationString className="margin-right-text">
                Subscribe
              </LocalizationString>
              <small> (All Tiers) </small>
            </div>
          </div>
          <div className="btn solid-green disabled">
            <LocalizationString>Free Messaging</LocalizationString>
          </div>
        </div>
      </div>
    </div>
  )
}
