import FCMedia from '../feed/FCMedia'

type Props = {
  children?: React.ReactNode
  className?: string
  banner?: string
  [x: string]: any
}

export default function FCAccountBanner({
  children,
  className,
  banner,
  ...rest
}: Props) {
  return (
    <div className={`fc-account-banner ${className ?? ''}`} {...rest}>
      {!banner ? (
        <div className="banner default-banner"></div>
      ) : (
        <FCMedia
          className="banner"
          data={{ type: 'image', sourceid: banner, timestamp: 0 }}
        />
      )}
    </div>
  )
}
