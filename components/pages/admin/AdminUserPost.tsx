import FCTimeline from '@/components/common/timeline/FCTimeline'

type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function AdminUserPost({
  children,
  className = '',
  ...rest
}: Props) {
  return (
    <div className={`${className}`} {...rest}>
      <FCTimeline />
    </div>
  )
}
