import { TMediaSize, TPostAttachment } from '@/types/media'
import FCAccountMedia from '../account/FCAccountMedia'
import FCAccountMediaBundle from '../account/FCAccountMediaBundle'

type Props = {
  children?: React.ReactNode
  className?: string
  data: TPostAttachment
  size?: TMediaSize
  [x: string]: any
}

export default function FCPostAttachment({
  children,
  className,
  size = 'normal',
  data: attachmentData,
  ...rest
}: Props) {
  const isBundle = attachmentData.Medias.length > 1
  return (
    <div className={`fc-post-attachment ${className ?? ''}`} {...rest}>
      {attachmentData.Medias.length > 1 ? (
        <FCAccountMediaBundle data={attachmentData.Medias} />
      ) : attachmentData.Medias.length === 1 ? (
        <FCAccountMedia data={attachmentData.Medias[0]} size={size} />
      ) : null}
    </div>
  )
}
