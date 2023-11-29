type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function FCButton({ children, className = '', ...rest }: Props) {
  return (
    <div className={`fc-button ${className}`} {...rest}>
      <div>{children}</div>
    </div>
  )
}
