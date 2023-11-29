import '@/styles/modals/media_vault_album_create.scss'
import LocalizationString from '../common/LocalizationString'
import { useModalMeta } from '@/contexts/modal'
import { useState } from 'react'

type Props = {
  children?: React.ReactNode
  className?: string
  data: {
    cb: (title: string, desc: string) => void
  }
  [x: string]: any
}

export default function FCMediaVaultAlbumCreateModal({
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
    <div className={`fc-media-vault-album-create-modal ${className}`} {...rest}>
      <div className="modal">
        <div className="modal-header">
          <div className="title">
            <LocalizationString>Create Vault Album</LocalizationString>
          </div>
          <div className="actions">
            <i className="fa-fw fa fa-xmark pointer blue-1-hover-only hover-effect"></i>
          </div>
        </div>
        <div className="modal-content">
          <div className="dark-blue-1 font-size-sm">
            <LocalizationString>
              Vault Albums help you organize your content and allow you to
              quickly find what you are looking for.
            </LocalizationString>
          </div>
          <div className="material-input">
            <input
              type="text"
              className="ng-untouched ng-pristine ng-invalid"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              className="ng-untouched ng-pristine ng-invalid"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="placeholder">
              <LocalizationString>Enter Description</LocalizationString>
            </div>
            <div className="label">
              <LocalizationString>Album Description</LocalizationString>
            </div>
          </div>
        </div>
        <div className="modal-footer flex-col">
          <div className="btn solid-blue margin-right-1" onClick={onCreate}>
            <LocalizationString>Create</LocalizationString>
          </div>
          <div
            className="btn outline-dark-blue margin-right-1"
            onClick={onClose}
          >
            <LocalizationString>Dismiss</LocalizationString>
          </div>
        </div>
      </div>
    </div>
  )
}
