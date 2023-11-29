import '@/styles/modals/media_vault_picker.scss'
import LocalizationString from '../common/LocalizationString'
import FCMediaVault from '../common/vault/FCMediaVault'
import { useModalMeta } from '@/contexts/modal'

type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function FCMediaVaultPickerModal({
  children,
  className = '',
  ...rest
}: Props) {
  const { pop } = useModalMeta()
  const closeModal = () => pop()

  const addImages = () => {
    pop()
  }

  return (
    <div className={`fc-media-vault-picker-modal ${className}`} {...rest}>
      <div className="modal">
        <div className="modal-header">
          <div className="title">
            <LocalizationString>Media Vault</LocalizationString>
          </div>
          <div className="actions" onClick={closeModal}>
            <i className="fa-fw fa fa-xmark pointer blue-1-hover-only hover-effect"></i>
          </div>
        </div>
        <div className="modal-content">
          <FCMediaVault />
        </div>
        <div className="modal-footer flex-col">
          <div className="btn large margin-right-1" onClick={closeModal}>
            <LocalizationString>Dismiss</LocalizationString>
          </div>
          <div className="btn large solid-blue" onClick={addImages}>
            <LocalizationString>Add</LocalizationString> 0{' '}
            <LocalizationString>Images</LocalizationString>
          </div>
        </div>
      </div>
    </div>
  )
}
