'use client'

import { TMedia, TMediaSize } from '@/types/media'
import LocalizationString from '../LocalizationString'
import FCAccountMedia from './FCAccountMedia'
import { useRef, useState } from 'react'
import Dropdown from '../dropdown'
import useOutsideClick from '@/hooks/useOutsideClick'
import { useModalMeta } from '@/contexts/modal'

type Props = {
  children?: React.ReactNode
  className?: string
  data: Array<TMedia>
  size?: TMediaSize
  [x: string]: any
}

export default function FCAccountMediaBundle({
  children,
  className,
  data: mediaBundle,
  size = 'normal',
  ...rest
}: Props) {
  const [open, setOpen] = useState(false)
  const trigger = useRef(null)
  const list = useRef(null)
  useOutsideClick(trigger, list, () => setOpen(false))

  const imageCount = mediaBundle.reduce(
    (acc, m) => acc + (m.type == 'image' ? 1 : 0),
    0,
  )
  const videoCount = mediaBundle.reduce(
    (acc, m) => acc + (m.type == 'video' ? 1 : 0),
    0,
  )

  const { push } = useModalMeta()
  const showMediaPermissions = () => {
    push({ id: 'accountmediapermissions', data: {} })
  }

  return (
    <div className={`fc-account-media-bundle ${className ?? ''}`} {...rest}>
      <div className="locked-image">
        <div className="purchased-content"></div>
        <div className="unlocked-content">
          <Dropdown className="media-dropdown pointer" open={open}>
            <div
              className="media-dropdown-title custom-hover-effect"
              onClick={() => setOpen(!open)}
              ref={trigger}
            >
              <i className="fa-fw fas fa-circle"></i>
              <i className="fa-fw fas fa-circle"></i>
              <i className="fa-fw fas fa-circle"></i>
            </div>
            <div className="dropdown-list" ref={list}>
              <div className="dropdown-item" onClick={showMediaPermissions}>
                <i className="fa-fw fal fa-shield-halved"></i>
                <LocalizationString>Media Permissions</LocalizationString>
              </div>
            </div>
          </Dropdown>
        </div>
        <div className="locked-text-container pointer font-size-xs">
          <div className="locked-text">Unlock Bundle</div>
          <div className="media-type blue-1">
            {imageCount > 0 && (
              <>
                <i className="fa-fw fal fa-camera margin-right-text"></i>
                <span className="font-size-sm">{imageCount}</span>
              </>
            )}
            {imageCount > 0 && videoCount > 0 && (
              <span className="margin-left-text margin-right-text">|</span>
            )}
            {videoCount > 0 && (
              <>
                <i className="fa-fw fal fa-video margin-right-text"></i>
                <span className="font-size-sm nowrap">{videoCount} (2:12)</span>
              </>
            )}
          </div>
          <div className="locked-icon">
            <i className="fa-fw fal fa-lock"></i>
            <i className="fa-fw fal fa-lock-open"></i>
          </div>
        </div>
      </div>

      <div className="feed-item-preview-media-list">
        <div className="feed-item-media-stacked">
          <FCAccountMedia
            className="feed-item-preview-media"
            data={mediaBundle[0]}
            inBundle={true}
            size={size}
          />
          <FCAccountMedia
            className="feed-item-preview-media"
            data={mediaBundle[1]}
            inBundle={true}
            size={size}
          />
        </div>

        {mediaBundle.length == 3 && (
          <FCAccountMedia
            className="feed-item-preview-media"
            data={mediaBundle[2]}
            inBundle={true}
            size={size}
          />
        )}

        {mediaBundle.length >= 4 && (
          <div className="feed-item-media-stacked">
            <FCAccountMedia
              className="feed-item-preview-media"
              data={mediaBundle[2]}
              inBundle={true}
              size={size}
            />
            <FCAccountMedia
              className="feed-item-preview-media"
              data={mediaBundle[3]}
              inBundle={true}
              size={size}
            />
          </div>
        )}
      </div>
    </div>
  )
}
