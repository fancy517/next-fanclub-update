'use client'

import LocalizationString from '@/components/common/LocalizationString'
import useOutsideClick from '@/hooks/useOutsideClick'
import { useRef, useState } from 'react'

type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

const filterData = [
  { id: 1, name: 'Likes', selected: false },
  { id: 2, name: 'Post Replies', selected: false },
  { id: 3, name: 'Post Quotes', selected: false },
  { id: 4, name: 'Tips', selected: false },
  { id: 5, name: 'Followers', selected: false },
  { id: 6, name: 'Media purchases', selected: false },
  { id: 7, name: 'Subscribers', selected: false },
  { id: 8, name: 'Expired Subscriptions', selected: false },
  { id: 9, name: 'Promotions', selected: false },
]

export default function NotificationFilterDropdown({
  children,
  className,
  ...rest
}: Props) {
  const [open, setOpen] = useState(false)
  const [filters, setFilters] = useState(filterData)
  const refTarget = useRef(null)
  const refTrigger = useRef(null)

  useOutsideClick(refTrigger, refTarget, () => setOpen(false), false)

  const toggleFilter = (i: number) => {
    let newFilters = [...filters]
    newFilters[i].selected = !newFilters[i].selected
    setFilters(newFilters)
  }

  return (
    <div className={`dropdown ${open && 'dropdown-open'}`}>
      <div
        className="dropdown-title flex-center"
        onClick={() => setOpen(!open)}
        ref={refTrigger}
      >
        <LocalizationString>Select Filters</LocalizationString>
      </div>
      <div className="dropdown-list" ref={refTarget}>
        {filters.map((filter, i) => (
          <div
            className="dropdown-item"
            key={i}
            onClick={() => toggleFilter(i)}
          >
            {filter.selected ? (
              <div className="checkbox selected">
                <i className="fa-fw fas fa-check"></i>
              </div>
            ) : (
              <div className="checkbox"></div>
            )}
            <LocalizationString>{filter.name}</LocalizationString>
          </div>
        ))}
      </div>
    </div>
  )
}
