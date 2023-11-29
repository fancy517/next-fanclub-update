import LocalizationString from '../common/LocalizationString'
import FCButton from '../common/button/FCButton'

type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function FCSettingsTextInput({
  children,
  className,
  ...rest
}: Props) {
  return (
    <div className={`fc-settings-text-input ${className ?? ''}`} {...rest}>
      <div className="flex-row">
        <div className="material-input">
          <input
            type="text"
            required={true}
            className="ng-untouched ng-pristine ng-invalid"
          />
          <div className="label">Display Name</div>
        </div>
        <FCButton className="change-button btn solid-blue wider margin-top-4 disabled">
          <LocalizationString>Change</LocalizationString>
        </FCButton>
      </div>
    </div>
  )
}
