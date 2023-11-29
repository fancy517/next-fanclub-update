import LocalizationString from '../LocalizationString'

type Props = {
  children?: React.ReactNode
  className?: string
  following?: boolean
  [x: string]: any
}

export default function FCAccountFollowButton({
  children,
  className,
  following = true,
  ...rest
}: Props) {
  return (
    <div className={`fc-account-follow-button ${className ?? ''}`} {...rest}>
      {following ? (
        <div className="hover-wrapper">
          <div className="btn solid-blue">
            <LocalizationString>Following</LocalizationString>
          </div>
          <div className="btn solid-red">
            <LocalizationString>Unfollow</LocalizationString>
          </div>
        </div>
      ) : (
        <div className="btn outline-blue">
          <LocalizationString>Follow</LocalizationString>
        </div>
      )}
    </div>
  )
}
