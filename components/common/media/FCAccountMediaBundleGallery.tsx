import { mockMedias } from '@/mock/medias'
import FCAccountMedia from '../account/FCAccountMedia'

type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function FCAccountMediaBundleGallery({
  children,
  className,
  ...rest
}: Props) {
  return (
    <div
      className={`fc-account-media-bundle-gallery ${className ?? ''}`}
      {...rest}
    >
      <div className="selected-image">
        <FCAccountMedia data={mockMedias[0]} />

        <div className="locked-image">
          <div className="locked-text-container font-size-xs">
            <div className="locked-text">Unlock Bundle</div>
            <div className="media-type blue-1">
              <i className="fa-fw fal fa-camera margin-right-text"></i>
              <span className="font-size-sm">4</span>
            </div>
            <div className="locked-icon">
              <i className="fa-fw fal fa-lock"></i>
              <i className="fa-fw fal fa-lock-open"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
