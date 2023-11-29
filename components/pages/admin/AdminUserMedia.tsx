import FCAccountMedia from '@/components/common/account/FCAccountMedia'
import { mockMedias } from '@/mock/medias'

type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function AdminUserMedia({
  children,
  className = '',
  ...rest
}: Props) {
  return (
    <div className={`admin-user-media-wrapper ${className}`} {...rest}>
      {[1, 2, 3].map((i) => (
        <div className="gallery-row" key={i}>
          <div className="render-container">
            <FCAccountMedia
              className="grid-media-item pointer"
              data={mockMedias[0]}
            />
          </div>

          <div className="render-container">
            <FCAccountMedia
              className="grid-media-item pointer"
              data={mockMedias[1]}
            />
          </div>

          <div className="render-container">
            <FCAccountMedia
              className="grid-media-item pointer"
              data={mockMedias[2]}
            />
          </div>

          <div className="render-container"></div>
          <div className="render-container"></div>
          <div className="render-container"></div>
          <div className="render-container"></div>
        </div>
      ))}
    </div>
  )
}
