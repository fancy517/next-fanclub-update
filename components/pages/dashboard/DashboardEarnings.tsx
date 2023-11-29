import LocalizationString from '@/components/common/LocalizationString'
import FCButtonNew from '@/components/common/button/FCButtonNew'
import FCBalanceDisplay from '@/components/common/subscription/FCBalanceDisplay'
import { useState } from 'react'
import { Line } from 'react-chartjs-2'
import { chartOptions } from './data'
import { mockChartData } from '@/mock/stat'
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import ReactDatePicker from 'react-datepicker'
import { formatDate } from '@/utils/helpers'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function DashboardEarnings({
  children,
  className = '',
  ...rest
}: Props) {
  const [selected, setSelected] = useState(0)
  const [address, setAddress] = useState('')
  const [amount, setAmount] = useState('')
  const [startDate, setStartDate] = useState<Date | null>(new Date())
  const [endDate, setEndDate] = useState<Date | null>(new Date())

  const withdraw = () => {}

  return (
    <div className={`dashboard-earnings ${className}`} {...rest}>
      <div className="tab-nav-wrapper solid-highlight">
        <div className="tab-nav-items">
          <div
            className={`tab-nav-item ${selected == 0 && 'selected'}`}
            onClick={() => setSelected(0)}
          >
            <i className="fa-fw fal fa-wallet margin-right-text" />
            <LocalizationString>Wallet</LocalizationString>
          </div>
          <div
            className={`tab-nav-item ${selected == 1 && 'selected'}`}
            onClick={() => setSelected(1)}
          >
            <i className="fa-fw fal fa-chart-pie margin-right-text" />
            <LocalizationString>Statistics</LocalizationString>
          </div>
        </div>
      </div>

      {selected == 0 && (
        <div>
          <div className="wallet-wrapper">
            <div className="bold">Wallet</div>
            <div className="flex-row flex-space-between margin-top-3 margin-bottom-1">
              <span>Total balance</span>
              <FCBalanceDisplay balance={10} />
            </div>
            <div className="flex-row flex-space-between">
              <span>Available for Payout</span>
              <span>15:00:35</span>
            </div>
          </div>

          <div className="wallet-wrapper">
            <div className="bold">Payout</div>

            <div className="flex-row flex-align-end">
              <div className="material-input">
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  style={{ minWidth: '18em' }}
                />
                <div className="label">
                  <LocalizationString>Withdraw Address</LocalizationString>
                </div>
                <div className="placeholder">
                  <LocalizationString>
                    Enter withdraw address
                  </LocalizationString>
                </div>
              </div>
              <div className="flex-1"></div>
            </div>

            <div className="flex-row">
              <div className="material-input">
                <input
                  type="text"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  style={{ minWidth: '18em' }}
                />
                <div className="label">
                  <LocalizationString>Amount</LocalizationString>
                </div>
                <div className="placeholder">
                  <LocalizationString>Enter withdraw amount</LocalizationString>
                </div>
              </div>
            </div>

            <div className="flex-row margin-bottom-2">
              <FCButtonNew
                buttonContent={
                  <div className="btn wider outline-blue margin-left-1 margin-top-3">
                    <i className="fa-fw fal fa-money-check-alt margin-right-text" />
                    Withdraw
                  </div>
                }
                confirmationContent={
                  <div className="flex-row margin-top-1">
                    Do you want to withdraw balance?
                  </div>
                }
                cb={withdraw}
              />
            </div>
          </div>
        </div>
      )}

      {selected == 1 && (
        <div className="stats-wrapper">
          <div className="flex-row filter margin-bottom-3">
            <ReactDatePicker
              startDate={startDate}
              onChange={(d) => setStartDate(d)}
              value={formatDate(startDate)}
            />

            <ReactDatePicker
              startDate={startDate}
              onChange={(d) => setStartDate(d)}
              value={formatDate(startDate)}
            />

            <div className="btn large">Filter</div>
          </div>
          <Line options={chartOptions} data={mockChartData} />
        </div>
      )}
    </div>
  )
}
