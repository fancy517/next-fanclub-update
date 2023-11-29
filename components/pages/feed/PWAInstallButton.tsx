type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function PWAInstallButton({
  children,
  className,
  ...rest
}: Props) {
  return <div className={`${className}`} {...rest}></div>
}
