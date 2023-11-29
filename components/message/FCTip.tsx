type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function FCTip({ children, className = '', ...rest }: Props) {
  return <div className={`fc-tip ${className}`} {...rest}></div>
}
