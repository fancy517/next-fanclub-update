import { useState } from 'react'

type Props = {
  children?: React.ReactNode
  className?: string
  level: number
  onChange: (value: number) => void
  [x: string]: any
}

export default function MultiToggleContainer({
  children,
  className = '',
  level,
  onChange,
  ...rest
}: Props) {
  const changeStep = (s: number) => {
    onChange(s)
  }
  return (
    <div className={`multi-toggle-container flex-row ${className}`} {...rest}>
      {['Off', 'Light', 'Medium', 'Strong'].map((text, i) => (
        <>
          {i > 0 && (
            <div
              className={`flex-col flex-align-self-center flex-align-center connector ${
                level >= i && 'selected-mode'
              }`}
            ></div>
          )}
          <div
            className={`option-container flex-col flex-align-center ${
              level >= i && 'selected-mode'
            }`}
            onClick={() => changeStep(i)}
          >
            <div className="option"></div>
            <div className="label">{text}</div>
          </div>
        </>
      ))}
    </div>
  )
}
