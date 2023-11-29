'use client'

import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import { useEffect, useRef } from 'react'
import ImageViewer from './ImageViewer'

type Props = {
  streamingKey: string
  contentID: string
  mediaType?: 'video' | 'image'
  [x: string]: any
}

const VideoJS = ({
  options,
  onReady,
}: {
  options: any
  onReady?: () => void
}) => {
  const videoRef = useRef(null)
  const playerRef = useRef(null)

  useEffect(() => {
    // make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current
      if (!videoElement) return

      // @ts-ignore
      playerRef.current = videojs(videoElement, options, () => {
        //console.log("player is ready");
        onReady && onReady()
      })
    } else {
      // you can update player here [update player through props]
      const player = playerRef.current
      // player.autoplay(options.autoplay);

      // @ts-ignore
      player.src(options.sources)
    }
  }, [options, videoRef, onReady])

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current

    return () => {
      if (player) {
        // @ts-ignore
        player.dispose()
        playerRef.current = null
      }
    }
  }, [playerRef])

  return (
    <div data-vjs-player>
      <video
        width="100%"
        controls={true}
        ref={videoRef}
        className="video-js vjs-default-skin vjs-16-9 vjs-big-play-centered vjs-playback-rate"
      />
    </div>
  )
}

export default function MediaPlayer({
  streamingKey,
  contentID,
  mediaType,
  ...props
}: Props) {
  const isVideo = mediaType == 'video'

  if (!isVideo) {
    return <ImageViewer contentID={contentID} />
  }

  const videoJsOptions = {
    // lookup the options in the docs for more options
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    playbackRates: [0.5, 1, 1.5, 2],
    sources: [
      {
        src: 'http://localhost:1935/api/playlist/' + contentID,
        type: 'application/x-mpegURL',
      },
    ],
  }

  return (
    <div className="media-player" {...props}>
      <VideoJS options={videoJsOptions} />
    </div>
  )
}
