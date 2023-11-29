import LocalizationString from '@/components/common/LocalizationString'

type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function FCProfileFollowersRoute({
  children,
  className,
  ...rest
}: Props) {
  return (
    <div className={`fc-profile-followers-route ${className ?? ''}`} {...rest}>
      <div className="material-input margin-top-1 margin-bottom-2">
        <input
          //   autocapitalize="none"
          //   autocomplete="off"
          //   autocorrect="off"
          //   spellcheck="false"
          type="text"
          required={true}
          className="ng-untouched ng-pristine ng-invalid"
        />
        <div className="label">
          <LocalizationString>Search for Follower</LocalizationString>
        </div>
        <div className="placeholder">
          <LocalizationString>Enter Username</LocalizationString>
        </div>
      </div>
      <div className="spacer" style={{ height: 0 }}></div>
      <div className="spacer" style={{ height: 0 }}></div>
    </div>
  )
}
