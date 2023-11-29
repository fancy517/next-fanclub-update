type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function FCOnlineFollowingStreams({
  children,
  className,
  ...rest
}: Props) {
  return (
    <div className={`fc-online-following-streams ${className}`} {...rest}></div>
  )
}
