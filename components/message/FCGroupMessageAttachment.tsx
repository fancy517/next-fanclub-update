import FCAccountMedia from '@/components/common/account/FCAccountMedia'
import { mockMedias } from '@/mock/medias'

type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function FCGroupMessageAttachment({
  children,
  className = '',
  ...rest
}: Props) {
  return (
    <div className={`fc-group-message-attachment ${className}`} {...rest}>
      <FCAccountMedia data={mockMedias[0]} showBlurOverlay={true} />
    </div>
  )
}
