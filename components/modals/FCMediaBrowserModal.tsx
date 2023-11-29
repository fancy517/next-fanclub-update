import { useRef, useState } from 'react'
import useOutsideClick from '@/hooks/useOutsideClick'
import Dropdown from '../common/dropdown'
import FCAccountMedia from '../common/account/FCAccountMedia'
import FCAccountAvatar from '../common/account/FCAccountAvatar'
import FCAccountUsername from '../common/account/FCAccountUsername'
import { TAccount } from '@/types/account'
import { TMedia } from '@/types/media'

type Props = {
  children?: React.ReactNode
  className?: string
  data: {
    medias: Array<TMedia>
    creators: Array<TAccount>
  }
  [x: string]: any
}

export default function FCMediaBrowserModal({
  children,
  className = '',
  data,
  ...rest
}: Props) {
  // more dropdown
  const [open, setOpen] = useState(false)
  const dot = useRef(null)
  const menu = useRef(null)
  useOutsideClick(dot, menu, () => setOpen(false))

  //
  const [stageId, setStageId] = useState(0)
  const { medias, creators } = data

  return (
    <div className={`fc-media-browser-modal ${className}`} {...rest}>
      <div className="modal-close-button">
        <i className="fa-fw fal fa-xmark"></i>
      </div>
      <div className="modal-more-dropdown">
        <Dropdown className="transparent-dropdown" open={open}>
          <i
            className="fas fa-ellipsis"
            ref={dot}
            onClick={() => setOpen(!open)}
          ></i>
          <div className="dropdown-list" ref={menu}>
            <div className="dropdown-item">High Quality Media</div>
          </div>
        </Dropdown>
      </div>
      <div className="modal-next-button xs-mobile-hidden zoom-hidden">
        <i className="fa-fw fal fa-chevron-right"></i>
      </div>
      <div className="modal-prev-button xs-mobile-hidden zoom-hidden">
        <i className="fa-fw fal fa-chevron-left"></i>
      </div>

      <div className="modal-content">
        <div
          className="media-slider"
          style={{ transform: `translate3d(-${stageId * 100}vw, 0px, 0px)` }}
        >
          {medias.map((media, i) => (
            <div className="media-wrapper" key={i}>
              <FCAccountMedia data={media} />
              <div className="social-overlay">
                <div className="feed-item-stats">
                  <div className="feed-item-stat">
                    <FCAccountAvatar
                      account={creators[i]}
                      className="pointer"
                      hideOnlineIndicator={true}
                    />
                  </div>
                  <div className="feed-item-stat likes">
                    <div className="icon-container">
                      <i className="fa-fw fas fa-heart"></i>
                    </div>
                    <span className="feed-item-stat-number">0</span>
                  </div>
                  <div className="feed-item-stat blue-1-hover-only">
                    <div className="icon-container">
                      <i className="fas fa-bookmark"></i>
                    </div>
                  </div>
                  <div className="feed-item-stat">
                    <div className="icon-container">
                      <i className="fa-solid fa-chart-simple"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="post-text-container-backdrop zoom-hidden"></div>
              <div className="username-container zoom-hidden">
                <FCAccountAvatar className="pointer" account={creators[i]} />
                <FCAccountUsername
                  maxLength={11}
                  className="pointer margin-left-1"
                  account={creators[i]}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
