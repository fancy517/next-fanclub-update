type Props = {
  children?: React.ReactNode
  className?: string
  source: string
  [x: string]: any
}

export default function FCMediaTemplate({
  children,
  className = '',
  source,
  ...rest
}: Props) {
  return (
    <div className={`fc-media-template ${className}`} {...rest}>
      <img alt="" src={source} />
    </div>
  )
}
