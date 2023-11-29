'use client'

import { mockMedias } from '@/mock/medias'
import { mockCreatorAccounts } from '@/mock/users'
import MediaWrapper from './MediaWrapper'
import { useState, useRef } from 'react'
import useWindowSize from '@/hooks/useWindowSize'

type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function FCMediaOfferSuggestionsBrowser({
  children,
  className = '',
  ...rest
}: Props) {
  let medias = [...mockMedias]
  for (let k = 0; k < 10; k++) {
    for (let i = 0; i < mockMedias.length; i++) {
      medias.push(mockMedias[i])
    }
  }
  const ref = useRef<HTMLDivElement>(null)
  const height = ref.current?.clientHeight ?? 0

  const [stageId, setStageId] = useState(0)
  const transform = `translate3d(0px, -${stageId * height}px, 0px)`

  const scrollDown = () =>
    stageId != medias.length - 1 && setStageId(stageId + 1)
  const scrollUp = () => stageId != 0 && setStageId(stageId - 1)

  return (
    <div
      className={`fc-media-offer-suggestions-browser ${className}`}
      ref={ref}
      {...rest}
    >
      <div className="media-slider visible" style={{ transform }}>
        <div className="flex-0" style={{ height: 0 }}></div>

        {medias.map((media, i) => (
          <MediaWrapper
            account={mockCreatorAccounts[i % 4]}
            media={media}
            isBundle={i == 0}
            onScrollUp={scrollUp}
            onScrollDown={scrollDown}
            key={i}
          />
        ))}
      </div>
    </div>
  )
}
