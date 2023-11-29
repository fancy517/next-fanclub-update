import classNames from 'classnames'
import { useState } from 'react'

type Props = {
  children?: React.ReactNode
  className?: string
  selected: boolean
  [x: string]: any
}

export default function XDCheckbox({
  children,
  className = '',
  selected,
  ...rest
}: Props) {
  return (
    <div className={`xd-checkbox ${className}`} {...rest}>
      <div className={classNames('checkbox', { selected })}>
        {selected && <i className="fa-fw fas fa-check"></i>}
      </div>
    </div>
  )
}
