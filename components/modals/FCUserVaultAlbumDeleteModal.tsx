import '@/styles/modals/user_vault_album_delete.scss'
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

export default function FCUserVaultAlbumDeleteModal({
  children,
  className = '',
  data,
  ...rest
}: Props) {
  const { pop } = useModalMeta()
  const { album, cb } = data

  const onClose = () => {
    pop()
  }

  const onDelete = () => {
    cb && cb()
    pop()
  }

  return (
    <div className={`fc-user-vault-album-delete-modal ${className}`} {...rest}>
      <div className="modal">
        <div className="modal-header">
          <div className="title">
            <LocalizationString>Delete Bookmark Album</LocalizationString>
          </div>
          <div className="actions" onClick={onClose}>
            <i className="fa-fw fa fa-xmark pointer blue-1-hover-only hover-effect"></i>
          </div>
        </div>
        <div className="modal-content">
          <div>
            <LocalizationString>
              Are you sure you want to delete the bookmark album named
            </LocalizationString>
            <span className="bold">{album.name}</span>?
            <LocalizationString>
              This does not delete the media from other albums.
            </LocalizationString>
          </div>
        </div>
        <div className="modal-footer flex-col">
          <div className="btn solid-blue margin-right-1" onClick={onDelete}>
            <LocalizationString>Yes</LocalizationString>
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
