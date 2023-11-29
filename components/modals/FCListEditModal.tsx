import '@/styles/modals/list_edit.scss'
import LocalizationString from '../common/LocalizationString'
import { useModalMeta } from '@/contexts/modal'
import { useState } from 'react'
import { TList } from '@/types'

type Props = {
  children?: React.ReactNode
  className?: string
  data: {
    cb: (name: string) => void
    list: TList
  }
  [x: string]: any
}

export default function FCListEditModal({
  children,
  className = '',
  data,
  ...rest
}: Props) {
  const { cb, list } = data
  const [name, setName] = useState(list.name)

  const { pop } = useModalMeta()
  const closeModal = () => pop()

  const save = () => {
    cb && cb(name)
    pop()
  }

  return (
    <div className={`fc-list-edit-modal ${className}`} {...rest}>
      <div className="modal">
        <div className="modal-header">
          <div className="title">
            <LocalizationString>Edit List</LocalizationString>
          </div>
          <div className="actions" onClick={closeModal}>
            <i className="fa-fw fa fa-xmark pointer blue-1-hover-only hover-effect"></i>
          </div>
        </div>
        <div className="modal-content">
          <div className="material-input margin-top-1">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="ng-untouched ng-pristine ng-invalid"
            />
            <div className="placeholder">
              <LocalizationString>e.g. Cat Lovers</LocalizationString>
            </div>
            <div className="label">
              <LocalizationString>Label</LocalizationString>
            </div>
          </div>
        </div>
        <div className="modal-footer margin-top-2">
          <div className="btn margin-right-1" onClick={closeModal}>
            <LocalizationString>Cancel</LocalizationString>
          </div>
          <div className="btn outline-blue" onClick={save}>
            <LocalizationString>Edit</LocalizationString>
          </div>
        </div>
      </div>
    </div>
  )
}
