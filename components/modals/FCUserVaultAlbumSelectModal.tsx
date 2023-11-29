import '@/styles/modals/user_vault_album_select.scss'
import LocalizationString from '../common/LocalizationString'
import { useModalMeta } from '@/contexts/modal'

type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function FCUserVaultAlbumSelectModal({
  children,
  className = '',
  ...rest
}: Props) {
  const { push, pop } = useModalMeta()

  const closeModal = () => pop()

  const showCreateModal = () =>
    push({ id: 'uservaultalbumcreate', data: { cb: () => {} } })

  return (
    <div className={`fc-user-vault-album-select-modal ${className}`} {...rest}>
      <div className="modal">
        <div className="modal-header">
          <div className="title">
            <LocalizationString>Select Album</LocalizationString>
          </div>
          <div className="actions" onClick={closeModal}>
            <i className="fa-fw fa fa-xmark pointer blue-1-hover-only hover-effect"></i>
          </div>
        </div>
        <div className="modal-content">
          <div className="dark-blue-1 font-size-sm">
            <LocalizationString>
              Please select the Album you would like to add the selected media
              to.
            </LocalizationString>
          </div>
          <div className="bubble-wrap margin-top-2">
            <div className="bubble eclipse">Purchases</div>
            <div className="bubble eclipse">Favorite</div>
            <div className="bubble eclipse">Hiii</div>
            <div className="bubble eclipse pointer" onClick={showCreateModal}>
              <i className="fal fa-plus"></i> Create New
            </div>
          </div>
        </div>
        <div className="modal-footer flex-col">
          <div
            className="btn outline-dark-blue margin-right-1"
            onClick={closeModal}
          >
            <LocalizationString>Dismiss</LocalizationString>
          </div>
        </div>
      </div>
    </div>
  )
}
