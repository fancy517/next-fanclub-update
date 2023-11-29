import FCAccountAvatar from '@/components/common/account/FCAccountAvatar'
import FCAccountUsername from '@/components/common/account/FCAccountUsername'
import FCDatePicker from '@/components/common/datepicker/FCDatePicker'
import Dropdown from '@/components/common/dropdown'
import FCBalanceDisplay from '@/components/common/subscription/FCBalanceDisplay'
import useOutsideClick from '@/hooks/useOutsideClick'
import { mockCreatorAccounts } from '@/mock/users'
import { formatDate } from '@/utils/helpers'
import { useRef, useState } from 'react'
import ReactDatePicker from 'react-datepicker'

type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function DashboardTopSupporters({
  children,
  className = '',
  ...rest
}: Props) {
  const [startDate, setStartDate] = useState<Date | null>(new Date())
  const [endDate, setEndDate] = useState<Date | null>(new Date())

  return (
    <div className={`dashboard-top-supporters ${className}`} {...rest}>
      <div className="page-description">
        View spending of your top supporters to find out what they like.
      </div>

      <div className="date-range-picker">
        {/* <span>From</span> */}
        <ReactDatePicker
          startDate={startDate}
          value={formatDate(startDate)}
          onChange={(date) => setStartDate(date)}
        />
        <span>~ </span>
        <ReactDatePicker
          startDate={endDate}
          value={formatDate(endDate)}
          onChange={(date) => setEndDate(date)}
        />
      </div>

      <div className="supporters-wrapper">
        {mockCreatorAccounts.map((account, i) => (
          <div
            className="margin-bottom-3 flex-row flex-align-center supporter-item"
            key={i}
          >
            <div className="account-avatar margin-right-2">
              <FCAccountAvatar account={account} />
            </div>
            <div className="">
              <FCAccountUsername account={account} showColumn={true} />
            </div>

            <div className="flex-1"></div>
            <FCBalanceDisplay balance={5} />
          </div>
        ))}
      </div>
    </div>
  )
}
