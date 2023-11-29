import { TMedia } from '@/types/media'
import FCMedia from '../common/feed/FCMedia'
import '@/styles/modals/media.scss'
import { useModalMeta } from '@/contexts/modal'

type Props = {
  children?: React.ReactNode
  className?: string
  data: {
    media: TMedia
  }
  [x: string]: any
}

export default function FCMediaModal({
  children,
  className = '',
  data,
  ...rest
}: Props) {
  const { media } = data
  const { pop } = useModalMeta()

  const closeModal = () => {
    pop()
  }

  return (
    <div className={`fc-media-modal ${className}`} {...rest}>
      <div className="modal-close-button" onClick={closeModal}>
        <i className="fa-fw fal fa-xmark"></i>
      </div>
      <div className="modal-content">
        <FCMedia
          data={media}
          className="media"
          objectFit="contain-no-grow"
          wrapper="overflow"
          overlay="image-overlay-wrapper"
        />
        {/* <app-media
          object-fit="contain-no-grow"
          resolution="1080p"
          className="media"
          _nghost-ng-c3322252370=""
        >
          <div
            oncontextmenu="return false;"
            appxddragscroll=""
            className="overflow-wrapper"
          >
            <img
              className="image contain-no-grow"
              src="blob:https://fansly.com/903bfb04-1af1-4ddb-9fa9-4ba483712b58"
              width="1080"
              height="1328"
              style="width: 765.271px; height: 941px; visibility: visible;"
            />
            <div  className="image-overlay-wrapper">
              <div
                className="image-overlay-flex"
                style="width: 765.271px; height: 941px;"
              ></div>
            </div>
          </div>
          <div  className="audio-size-wrapper"></div>
        </app-media> */}
      </div>
    </div>
  )
}
