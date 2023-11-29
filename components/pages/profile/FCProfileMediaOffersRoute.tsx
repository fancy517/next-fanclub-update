import FCAccountMedia from '@/components/common/account/FCAccountMedia'
import { mockMedias } from '@/mock/medias'

type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function FCProfileMediaOffersRoute({
  children,
  className,
  ...rest
}: Props) {
  return (
    <div
      className={`fc-profile-media-offers-route ${className ?? ''}`}
      {...rest}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((_, i) => (
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
