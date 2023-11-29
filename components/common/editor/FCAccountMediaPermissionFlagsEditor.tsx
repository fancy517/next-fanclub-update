type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function FCAccountMediaPermissionFlagsEditor({
  children,
  className = '',
  ...rest
}: Props) {
  return (
    <div
      className={`fc-account-media-permission-flags-editor ${className}`}
      {...rest}
    >
      <div className="flex-col">
        <div className="flex-row form-look flex-align-center flex-sm-col">
          <div className="flex-row flex-align-center permission-flag max-100">
            <span className="margin-right-text">Subscribed </span>
            <small> (All Tiers) </small>
          </div>
        </div>
      </div>
    </div>
  )
}
