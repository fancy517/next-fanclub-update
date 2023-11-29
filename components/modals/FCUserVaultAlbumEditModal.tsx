import '@/styles/modals/user_vault_album_edit.scss'
import LocalizationString from '../common/LocalizationString'
import { useModalMeta } from '@/contexts/modal'
import { TAlbum } from '@/types'
import { useState } from 'react'

type Props = {
  children?: React.ReactNode
  className?: string
  data: {
    album: TAlbum
    cb: () => void
  }
  [x: string]: any
}

export default function FCUserVaultAlbumEditModal({
  children,
  className = '',
  data,
  ...rest
}: Props) {
  const { pop } = useModalMeta()
  const { album, cb } = data
  const [title, setTitle] = useState(album.name)
  const [description, setDescription] = useState(album.description)

  const onClose = () => {
    pop()
  }

  const onEdit = () => {
    cb && cb()
    pop()
  }

  return (
    <div className={`fc-user-vault-album-edit-modal ${className}`} {...rest}>
      <div className="modal">
        <div className="modal-header">
          <div className="title">
            <LocalizationString>Edit Album</LocalizationString>
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
        <div className="modal-footer flex-col">
          <div
            className="btn outline-dark-blue large margin-right-2"
            onClick={onClose}
          >
            <LocalizationString>Dismiss</LocalizationString>
          </div>
          <div className="btn solid-blue large" onClick={onEdit}>
            <LocalizationString>Edit</LocalizationString>
          </div>
        </div>
      </div>
    </div>
  )
}
