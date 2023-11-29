type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function FCSideBarRight({
  children,
  className,
  ...rest
}: Props) {
  return (
    <div className={`fc-side-bar-right ${className ?? ''}`} {...rest}>
      <div className="side-bar-wrapper">
        <div className="flex-col pointer-events">{children}</div>
      </div>
    </div>
  )
}
