type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function NewVersionBanner({
  children,
  className,
  ...rest
}: Props) {
  return <div className={`${className}`} {...rest}></div>
}
