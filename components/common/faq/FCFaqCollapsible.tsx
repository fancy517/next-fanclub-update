'use client'

import LocalizationString from '../LocalizationString'
import { useState } from 'react'

type Props = {
  children?: React.ReactNode
  className?: string
  title: string
  text: string
  [x: string]: any
}

export default function FCFaqCollapsible({
  children,
  className,
  title,
  text,
  ...rest
}: Props) {
  const [open, setOpen] = useState(false)

  const toggle = () => {
    setOpen(!open)
  }

  return (
    <div className={`fc-faq-collapsible ${className ?? ''}`} {...rest}>
      <div className="faq-title" onClick={toggle}>
        <span>{title}</span>
        {open ? (
          <i className="fa-fw fa fa-chevron-up" />
        ) : (
          <i className="fa-fw fa fa-chevron-down" />
        )}
      </div>

      {open && (
        <div className="faq-text">
          <LocalizationString>{text}</LocalizationString>
          <br />
          <br />
        </div>
      )}
    </div>
  )
}
