type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function FCFollowingMediaStories({
  children,
  className,
  ...rest
}: Props) {
  return (
    <div className={`${className}`} {...rest}>
      <div className="stories-scroll-container">
        <div className="spacer" style={{ width: 0 }}></div>
        <div className="spacer" style={{ width: 0 }}></div>
      </div>
    </div>
  )
}
