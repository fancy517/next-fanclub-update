'use client'

import { useRef, useState } from 'react'
import FCAccountMedia from '../account/FCAccountMedia'
import { mockMedias } from '@/mock/medias'
import Dropdown from '../dropdown'
import useOutsideClick from '@/hooks/useOutsideClick'

type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function FCMediaOfferSuggestionsTimelinePost({
  children,
  className = '',
  ...rest
}: Props) {
  const [open, setOpen] = useState(false)
  const trigger = useRef(null)
  const list = useRef(null)
  useOutsideClick(trigger, list, () => setOpen(false))

  return (
    <div
      className={`fc-media-offer-suggestions-timeline-post ${className}`}
      {...rest}
    >
      <div className="fyp-gallery-wrapper">
        <div className="semi-bold flex-row flex-align-center title-container">
          Made For You <div className="flex-1"></div>
          <Dropdown className="transparent-dropdown" open={open}>
            <i
              className="fa-solid fa-ellipsis pointer blue-1-hover-only font-22"
              onClick={() => setOpen(!open)}
              ref={trigger}
            ></i>
            <div className="dropdown-list" ref={list}>
              <div className="dropdown-item">
                <i className="fa-solid fa-align-slash"></i> Don&apos;t Show This
                Again.
              </div>
            </div>
          </Dropdown>
        </div>

        <div className="fyp-gallery flex-row margin-top-2">
          <div className="single-preview">
            <FCAccountMedia
              className="gallery-image"
              data={mockMedias[0]}
              size="small"
            />
          </div>
          <div className="flex-col preview-group">
            <div className="preview-half">
              <FCAccountMedia
                className="gallery-image"
                data={mockMedias[1]}
                size="small"
              />
            </div>
            <div className="preview-half">
              <FCAccountMedia
                className="gallery-image"
                data={mockMedias[2]}
                size="small"
              />
              <div className="show-more">
                <div>Show More</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
