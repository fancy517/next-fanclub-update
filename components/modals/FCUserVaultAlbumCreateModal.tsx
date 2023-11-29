import '@/styles/modals/user_vault_album_create.scss'
import LocalizationString from '../common/LocalizationString'
import { useModalMeta } from '@/contexts/modal'
import { useState } from 'react'

type Props = {
  children?: React.ReactNode
  className?: string
  data: {
    cb?: (title: string, desc: string) => void
  }
  [x: string]: any
}

export default function FCUserVaultAlbumCreateModal({
  children,
  className = '',
  data,
  ...rest
}: Props) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const { cb } = data

  const { pop } = useModalMeta()
  const onClose = () => {
    pop()
  }

  const onCreate = () => {
    cb && cb(title, description)
    pop()
  }

  return (
    <div className={`fc-user-vault-album-create-modal ${className}`} {...rest}>
      <div className="modal">
        <div className="modal-header">
          <div className="title">
            <LocalizationString>Create New Album</LocalizationString>
          </div>
          <div className="actions" onClick={onClose}>
            <i className="fa-fw fa fa-xmark pointer blue-1-hover-only hover-effect"></i>
          </div>
        </div>
        <div className="modal-content">
          <div className="dark-blue-1 font-size-sm">
            <LocalizationString>
              Collections help you organize your content and allow you to
              quickly find your favorite content.
            </LocalizationString>
          </div>
          <div className="material-input">
            <input
              type="text"
              required={true}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="ng-untouched ng-pristine ng-invalid"
            />
            <div className="placeholder">
              <LocalizationString>Enter Album title</LocalizationString>
            </div>
            <div className="label">
              <LocalizationString>Album Title</LocalizationString>
            </div>
          </div>
          <div className="material-input">
            <input
              type="text"
              required={true}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="ng-untouched ng-pristine ng-invalid"
            />
            <div className="placeholder">
              <LocalizationString>Enter Description</LocalizationString>
            </div>
            <div className="label">
              <LocalizationString>Album Description</LocalizationString>
            </div>
          </div>
        </div>
        <div className="modal-footer margin-top-3 flex-col">
          <div
            className="btn outline-dark-blue large margin-right-2"
            onClick={onClose}
          >
            <LocalizationString>Dismiss</LocalizationString>
          </div>
          <div className="btn solid-blue large" onClick={onCreate}>
            <LocalizationString>Create</LocalizationString>
          </div>
        </div>
      </div>
    </div>
  )
}
