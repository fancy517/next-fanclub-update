import { useModalMeta } from '@/contexts/modal'
import LocalizationString from '../common/LocalizationString'
import FCAccountMediaPermissionFlagsEditor from '../common/editor/FCAccountMediaPermissionFlagsEditor'

type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function FCAccountMediaPermissionsModal({
  children,
  className = '',
  ...rest
}: Props) {
  const { pop } = useModalMeta()
  return (
    <div
      className={`fc-account-media-permissions-modal ${className}`}
      {...rest}
    >
      <div className="modal">
        <div className="modal-header">
          <div className="title">
            <LocalizationString>Media Permissions</LocalizationString>
          </div>
          <div className="actions" onClick={pop}>
            <i className="fa-fw fa fa-xmark pointer blue-1-hover-only hover-effect"></i>
          </div>
        </div>
        <div className="modal-content">
          <div className="dark-blue-1 font-size-sm margin-bottom-2">
            <LocalizationString>
              Permissions decide who can access or purchase media and can change
              the price based on your level of involvement with the creator. You
              can find all permissions set for this media below.
            </LocalizationString>
          </div>

          <FCAccountMediaPermissionFlagsEditor />
        </div>
      </div>
    </div>
  )
}
