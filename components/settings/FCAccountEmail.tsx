type Props = {
  children?: React.ReactNode
  className?: string
  email: string
  [x: string]: any
}

export default function FCAccountEmail({
  children,
  className,
  email,
  ...rest
}: Props) {
  return (
    <div className={`${className ?? ''}`} {...rest}>
      <span className="dark-blue-1">
        {email}
        &nbsp;<i className="fas fa-check blue-1"></i>
      </span>
    </div>
  )
}
