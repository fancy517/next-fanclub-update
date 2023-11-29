type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function LocalizationString({
  children,
  className,
  ...rest
}: Props) {
  return <>{children}</>
}
