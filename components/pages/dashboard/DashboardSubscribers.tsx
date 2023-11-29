'use client'

import LocalizationString from '@/components/common/LocalizationString'
import SubscriberCard from '@/components/common/subscription/SubscriberCard'
import { mockCreatorAccounts } from '@/mock/users'
import { useEffect, useState } from 'react'

type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function DashboardSubscribers({
  children,
  className = '',
  ...rest
}: Props) {
  const [selected, setSelected] = useState(0)
  const [filter, setFilter] = useState('')
  const subscribers = mockCreatorAccounts

  const clearFilter = () => setFilter('')

  const loadSubscribers = async () => {}

  useEffect(() => {
    loadSubscribers()
  }, [selected])

  return (
    <div className={`${className}`} {...rest}>
      <div className="tab-nav-wrapper solid-highlight">
        <div className="tab-nav-items">
          <div
            className={`tab-nav-item ${selected == 0 && 'selected'}`}
            onClick={() => setSelected(0)}
          >
            <LocalizationString className="margin-right-text">
              Active
            </LocalizationString>{' '}
            (0)
          </div>
          <div
            className={`tab-nav-item ${selected == 1 && 'selected'}`}
            onClick={() => setSelected(1)}
          >
            <LocalizationString className="margin-right-text">
              Expired
            </LocalizationString>{' '}
            (0)
          </div>
          <div
            className={`tab-nav-item ${selected == 2 && 'selected'}`}
            onClick={() => setSelected(2)}
          >
            <LocalizationString className="margin-right-text">
              All
            </LocalizationString>{' '}
            (0)
          </div>
        </div>
      </div>

      <div className="material-input margin-top-1 icon-right">
        <input
          type="text"
          required
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="ng-untouched ng-pristine ng-invalid"
        />
        <div className="icon-right pointer" onClick={clearFilter}>
          <i className="fal fa-xmark blue-1-hover-only"></i>
        </div>
        <div className="label">
          <LocalizationString>Search for Subscriber</LocalizationString>
        </div>
        <div className="placeholder">
          <LocalizationString>Enter Username</LocalizationString>
        </div>
      </div>

      {/* subscribers */}
      <div className="subscribers-wrapper">
        {subscribers.map((sub, i) => (
          <SubscriberCard key={i} account={sub} />
        ))}
      </div>
    </div>
  )
}
