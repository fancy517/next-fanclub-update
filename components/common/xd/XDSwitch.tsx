import { useEffect, useState } from 'react'

type Props = {
  children?: React.ReactNode
  className?: string
  value: boolean
  [x: string]: any
}

export default function XDSwitch({ children, className, value, ...rest }: Props) {
  const [selected, setSelected] = useState<boolean>(value === undefined ? false : value)
  useEffect(() => {
    setSelected(value)
  }, [value])
  return (
    <div className={`xd-switch ${className ?? ''}`} {...rest}>
      <div
        className={`switch ${selected ? 'selected' : ''}`}
        onClick={() => setSelected(!selected)}
      >
        <div className="switch-toggle animate-transform"></div>
      </div>
    </div>
  )
}
