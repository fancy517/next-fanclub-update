'use client'

import useOutsideClick from '@/hooks/useOutsideClick'
import classNames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'

type Props = {
  children?: React.ReactNode
  className?: string
  placeholder: string
  data: Array<any>
  renderer: (v: any) => React.ReactNode
  [x: string]: any
  onSelect?: (v: string) => void
}

export default function XDDropdown({
  children,
  className = '',
  placeholder,
  data,
  renderer,
  onSelect,
  ...rest
}: Props) {
  const refTrigger = useRef(null)
  const refTarget = useRef(null)
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(-1)
  useEffect(()=> {
    onSelect && onSelect(data[selected])
  },[selected])

  useOutsideClick(refTrigger, refTarget, () => setOpen(false))
  return (
    <div
      className={classNames('', className, { 'dropdown-open': open })}
      {...rest}
    >
      <div
        className="dropdown-title"
        ref={refTrigger}
        onClick={() => setOpen(!open)}
      >
        <div>{selected == -1 ? placeholder : renderer(data[selected])}</div>
        <i className="fa-fw fa fa-chevron-up"></i>
        <i className="fa-fw fa fa-chevron-down"></i>
      </div>
      <div className="dropdown-list" ref={refTarget}>
        {data.map((v, i) => (
          <div className="dropdown-item" key={i} onClick={() => setSelected(i)}>
            {renderer(v)}
          </div>
        ))}
      </div>
    </div>
  )
}
