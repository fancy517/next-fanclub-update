import { useState } from 'react'
import LocalizationString from '../LocalizationString'

type Props = {
  children?: React.ReactNode
  className?: string
  value: string
  selected: boolean
  [x: string]: any
}

export default function XDRadio({
  children,
  className = '',
  value,
  selected,
  ...rest
}: Props) {
  return (
    <div className={`xd-radio ${className}`} {...rest}>
      <div className="radio-wrapper">
        {selected ? (
          <i className="fal fa-circle-dot selected"></i>
        ) : (
          <i className="fal fa-circle"></i>
        )}
        <div className="label capitalize">
          <LocalizationString>{value}</LocalizationString>
        </div>
      </div>
    </div>
  )
}
