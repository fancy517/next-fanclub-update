import classNames from 'classnames'

type Props = {
  children?: React.ReactNode
  className?: string
  open: boolean
  [x: string]: any
}

export default function Dropdown({
  children,
  className = '',
  open,
  ...rest
}: Props) {
  return (
    <div className={classNames(className, { 'dropdown-open': open })} {...rest}>
      {children}
    </div>
  )
}
