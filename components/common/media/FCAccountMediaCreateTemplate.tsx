import LocalizationString from '../LocalizationString'
import FCAccountMediaTemplate from './FCAccountMediaTemplate'

type Props = {
  children?: React.ReactNode
  className?: string
  source: string
  onCancel: () => void
  [x: string]: any
}

export default function FCAccountMediaCreateTemplate({
  children,
  className = '',
  source,
  onCancel,
  ...rest
}: Props) {
  return (
    <div className={`fc-account-media-create-template ${className}`} {...rest}>
      <div className="locked-image">
        <div className="flex-row flex-justify-start header-options">
          <div className="badge close" onClick={onCancel}>
            <i className="fa-fw fal fa-xmark"></i>
          </div>
          <div className="flex-1"></div>
          <div className="badge sm-mobile-visible">
            <i className="fa-fw fal fa-lock"></i>
          </div>
        </div>
        <div className="locked-text-container pointer font-size-xs sm-mobile-hidden edit-permissions">
          <div className="locked-text">
            <span className="bold blue-1 pointer hover-underline">
              <LocalizationString>Edit Permissions</LocalizationString>
            </span>
          </div>

          <div className="locked-icon">
            <i className="fa-fw fal fa-pencil"></i>
          </div>
        </div>
      </div>

      <div className="feed-item-preview-media-list">
        <FCAccountMediaTemplate
          className="feed-item-preview-media"
          source={source}
        />
      </div>

      <div className="upload-progress">
        <div className="progress-percent"> 40.7% </div>
        <div className="progress-bar margin-top-2">
          <div
            className="progress-bar-progress"
            style={{ width: '40.7343%' }}
          ></div>
        </div>
      </div>
      <div className="drag-surface">
        <i className="fas fa-up-down-left-right blue-1"></i>
      </div>
    </div>
  )
}
