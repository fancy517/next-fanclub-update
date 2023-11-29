import '@/styles/components/datepicker/datepicker.scss'
import LocalizationString from '../LocalizationString'
import { useModalMeta } from '@/contexts/modal'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

type Props = {
  children?: React.ReactNode
  className?: string
  data: {
    current?: Date
    cb: (date: Date) => void
  }
  [x: string]: any
}

export default function FCDatePicker({
  children,
  className = '',
  data,
  ...rest
}: Props) {
  const [date, setDate] = useState<Date | null>(data.current ?? new Date())
  const { pop } = useModalMeta()
  const { cb } = data

  const closeModal = () => pop()
  const confirm = () => {
    if (date) cb(date)
    pop()
  }

  return (
    <div className={`fc-date-picker ${className}`} {...rest}>
      <div className="modal">
        <div className="modal-header">
          <span className="flex-1">
            <LocalizationString>Select Date</LocalizationString>
          </span>
          <i
            className="fa-fw fa fa-xmark pointer blue-1-hover-only hover-effect"
            onClick={closeModal}
          ></i>
        </div>
        <div className="modal-content">
          <div className="flex-row margin-bottom-4">
            <i className="fa-fw fal fa-calendar-days"></i>{' '}
            {date?.toDateString()}
          </div>

          <DatePicker
            selected={date}
            onChange={(d) => setDate(d)}
            inline
            calendarClassName="xd-date-picker"
          />

          <div className="flex-row title timezone">
            <LocalizationString>Time Zone</LocalizationString>
          </div>
          <div className="margin-top-1">
            {Intl.DateTimeFormat().resolvedOptions().timeZone}
          </div>
        </div>
        <div className="modal-footer">
          <div className="flex-1"></div>
          <div
            className="btn outline-dark-blue large confirm-btn margin-right-1"
            onClick={closeModal}
          >
            <LocalizationString>Dismiss</LocalizationString>
          </div>
          <div className="btn outline-blue large confirm-btn" onClick={confirm}>
            <LocalizationString>Confirm</LocalizationString>
          </div>
        </div>
      </div>
    </div>
  )
}
