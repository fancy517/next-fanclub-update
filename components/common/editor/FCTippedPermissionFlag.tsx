import { useState } from 'react'
import FCBalanceDisplay from '../subscription/FCBalanceDisplay'
import FCBalanceInput from './FCBalanceInput'

type Props = {
  children?: React.ReactNode
  className?: string
  value: number
  onChange: (value: number) => void
  onRemove: () => void
  [x: string]: any
}

export default function FCTippedPermissionFlag({
  children,
  className,
  value,
  onChange,
  onRemove,
  ...rest
}: Props) {
  const [editing, setEditing] = useState(false)
  const [sv, setsv] = useState(value.toString())
  return (
    <div className={`fc-tipped-permission-flag ${className ?? ''}`} {...rest}>
      tipped
      {editing ? (
        <>
          <FCBalanceInput
            value={sv}
            onChange={(s) => setsv(s)}
            className="margin-left-1 margin-right-text"
            size="small"
          />
          <i
            className="fa fa-check margin-left-1 blue-1-hover-only pointer"
            onClick={() => {
              setEditing(false)
              onChange(Number(sv))
            }}
          ></i>
          <i
            className="fas fa-xmark margin-left-1 blue-1-hover-only pointer"
            onClick={() => setEditing(false)}
          ></i>
        </>
      ) : (
        <>
          <span className="margin-left-text">
            <span className="gem-amount">
              <FCBalanceDisplay balance={value} />
            </span>
          </span>
          <i
            className="fa fa-pencil margin-left-1 blue-1-hover-only pointer"
            onClick={() => setEditing(true)}
          ></i>
          <i
            className="fal fa-trash-can margin-left-1 blue-1-hover-only pointer"
            onClick={onRemove}
          ></i>
        </>
      )}
    </div>
  )
}
