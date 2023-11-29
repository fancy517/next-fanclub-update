import { useRef, useState } from 'react'
import LocalizationString from '../LocalizationString'
import FCMediaTemplate from './FCMediaTemplate'
import useOutsideClick from '@/hooks/useOutsideClick'
import Dropdown from '../dropdown'

type Props = {
  children?: React.ReactNode
  className?: string
  source: string
  onRemove?: () => void
  [x: string]: any
}

export default function FCAccountMediaTemplate({
  children,
  className = '',
  source,
  onRemove,
  ...rest
}: Props) {
  const [open, setOpen] = useState(false)
  const button = useRef(null)
  const menu = useRef(null)
  useOutsideClick(button, menu, () => setOpen(false))

  const remove = () => {
    onRemove && onRemove()
  }

  return (
    <div
      className={`fc-account-media-template ${className}`}
      style={{ ...rest.style }}
      {...rest}
    >
      <div className="media-container">
        <div className="main-image">
          <FCMediaTemplate source={source} />
        </div>

        <div className="settings-row">
          {/* <div className="move margin-right-text blue-1-hover-only">
            <i className="fal fa-arrows-up-down-left-right"></i>
          </div> */}
          {/* <Dropdown className="settings-dropdown" open={open}>
            <div
              className="dropdown-title transparent"
              onClick={() => {
                console.log('123213')
                setOpen(true)
              }}
              ref={button}
            >
              <i className="fa-fw fal fa-gear"></i>
            </div>
            <div className="dropdown-list" ref={menu}>
              <div className="dropdown-item" onClick={remove}>
                <i className="fa-fw fal fa-trash"></i>
                <LocalizationString>Remove</LocalizationString>
              </div>
            </div>
          </Dropdown> */}
          <div
            className="dropdown-item"
            style={{ background: 'transparent', padding: '5px 0' }}
            onClick={remove}
          >
            <i
              className="fa-fw fal fa-trash"
              style={{ color: '#df3434 !important' }}
            ></i>
          </div>
        </div>
      </div>
      <div className="drag-surface">
        <i className="fal fa-arrows-up-down-left-right blue-1"></i>
      </div>
    </div>
  )
}
