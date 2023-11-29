import { TMedia } from '@/types/media'
import FCAccountMedia from '../account/FCAccountMedia'
import { useState } from 'react'

type Props = {
  children?: React.ReactNode
  className?: string
  media: TMedia
  [x: string]: any
}

export default function RenderContainer({
  children,
  className = '',
  media,
  ...rest
}: Props) {
  const [selected, setSelected] = useState(false)
  return (
    <div className="render-container" {...rest}>
      <div className="image-date">7 August</div>
      <div className="image-controls" onClick={() => setSelected(!selected)}>
        <div className="flex-row flex-justify-end">
          {selected ? (
            <i className="fa-fw fas fa-circle blue-1"></i>
          ) : (
            <i className="fa-fw fal fa-circle"></i>
          )}
        </div>
      </div>
      <FCAccountMedia className="image" data={media} />
    </div>
  )
}
