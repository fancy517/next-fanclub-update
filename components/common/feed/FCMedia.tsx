import { TMedia } from '@/types/media'
import classNames from 'classnames'
import Image from 'next/image'

type Props = {
  children?: React.ReactNode
  className?: string
  data: TMedia
  objectFit?: 'contain-no-grow' | 'cover'
  wrapper?: 'image-placeholder' | 'overflow'
  overlay?: 'image-overlay' | 'image-overlay-wrapper'
  disableBlur?: boolean
  [x: string]: any
}

export default function FCMedia({
  children,
  className = '',
  data: mediaData,
  objectFit = 'cover',
  wrapper = 'image-placeholder',
  overlay = 'image-overlay',
  disableBlur = false,
  ...rest
}: Props) {
  const showVideo = mediaData.type == 'video' && mediaData.sourceid != undefined
  const isSensitive = mediaData.sensitive && !disableBlur

  const imageUrl = mediaData.sourceid
  const srcurl = `${process.env.NEXT_PUBLIC_SERVER_URL}/public/${mediaData.sourceid}`
  return (
    <div className={`fc-media ${className}`} {...rest}>
      <div className={`${wrapper}-wrapper cover`}>
        {showVideo ? (
          <video
            src={srcurl}
            controls
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : imageUrl ? (
          <>
            <Image
              className={`image ${objectFit}`}
              src={srcurl}
              alt=""
              // style={{width:'900px', height:'200px'}}
              width={900}
              height={50}
            />
            <div
              className={classNames(overlay, { 'blur-variant': isSensitive })}
            ></div>
          </>
        ) : (
          <div className="div-placeholder" style={{ paddingTop: '50%' }}></div>
        )}
      </div>
    </div>
  )
}
