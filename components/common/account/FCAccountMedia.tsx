'use client'

import { TMedia, TMediaSize, TMediaType } from '@/types/media'
import classNames from 'classnames'
import FCMediaSFWFilterOverlay from '../feed/FCMediaSFWFilterOverlay'
import FCMedia from '../feed/FCMedia'
import LocalizationString from '../LocalizationString'
import { useRef, useState } from 'react'
import useOutsideClick from '@/hooks/useOutsideClick'
import Dropdown from '../dropdown'
import { useModalMeta } from '@/contexts/modal'

type Props = {
  children?: React.ReactNode
  className?: string
  data: TMedia
  inBundle?: boolean
  showBlurOverlay?: boolean
  size?: TMediaSize
  [x: string]: any
}

export default function FCAccountMedia({
  children,
  className,
  data: mediaData,
  inBundle = false,
  showBlurOverlay = false,
  size = 'normal',
  ...rest
}: Props) {
  const hasPreview = mediaData.preview != undefined
  const isLocked = mediaData.locked
  const isSensitive = mediaData.sensitive
  const [disableSFW, setDisableSFW] = useState(false)

  const { push } = useModalMeta()
  const onBookmark = () => {
    push({ id: 'uservaultalbumselect', data: {} })
  }

  const showPermissions = () =>
    push({ id: 'accountmediapermissions', data: {} })

  const togglePreview = () => {}

  const content = (
    <>
      <FCMedia className="image" data={mediaData} disableBlur={disableSFW} />
      {!inBundle && isLocked && (
        <UnlockedContent
          onShowPermission={showPermissions}
          onAddCollection={onBookmark}
          onTogglePreview={togglePreview}
        />
      )}
      {isLocked && <LockIconCentered />}
      {!isLocked && (
        <StatsOverlay mediaType={mediaData.type} onBookmark={onBookmark} />
      )}
      {isLocked && !inBundle && (
        <LockedTextContainerWrapper mediaType={mediaData.type} />
      )}
    </>
  )

  return (
    <div className={`fc-account-media ${className ?? ''}`} {...rest}>
      {isLocked ? (
        <div
          className={classNames('locked-image', {
            'has-preview-image': hasPreview,
          })}
        >
          {content}
        </div>
      ) : (
        content
      )}

      {isSensitive && !isLocked && !disableSFW && (
        <FCMediaSFWFilterOverlay
          showOnlyIcon={size == 'small'}
          onView={() => setDisableSFW(true)}
        />
      )}

      {showBlurOverlay && (
        <div className="blur-overlay flex-col flex-align-center flex-center blur-mode-3">
          <div className="btn solid-blue small">
            <i className="fa-fw fas fa-eye"></i> View Content
          </div>
          <div
            // routerlink="/settings/privacy"
            className="btn small margin-top-2"
            // tabindex="0"
          >
            <i className="fa-fw fas fa-gear"></i> Disable Filter
          </div>
        </div>
      )}
    </div>
  )
}

function UnlockedContent({
  onAddCollection,
  onShowPermission,
  onTogglePreview,
}: {
  onAddCollection: () => void
  onShowPermission: () => void
  onTogglePreview: () => void
}) {
  const [open, setOpen] = useState(false)
  const dot = useRef(null)
  const list = useRef(null)
  useOutsideClick(dot, list, () => setOpen(false))

  return (
    <div className="unlocked-content">
      <Dropdown className="media-dropdown pointer" open={open}>
        <div
          className="media-dropdown-title custom-hover-effect"
          onClick={() => setOpen(!open)}
          ref={dot}
        >
          <i className="fa-fw fas fa-circle"></i>
          <i className="fa-fw fas fa-circle"></i>
          <i className="fa-fw fas fa-circle"></i>
        </div>
        <div className="dropdown-list" ref={list}>
          <div className="dropdown-item" onClick={onTogglePreview}>
            <i className="fa-fw fal fa-eye"></i>
            <LocalizationString>Toggle Preview</LocalizationString>
          </div>
          <div className="dropdown-item" onClick={onAddCollection}>
            <i className="fal fa-bookmark"></i>
            <LocalizationString>Add to Collection</LocalizationString>
          </div>
          <div className="dropdown-item" onClick={onShowPermission}>
            <i className="fa-fw fal fa-shield-halved"></i>
            <LocalizationString>Media Permissions</LocalizationString>
          </div>
        </div>
      </Dropdown>
    </div>
  )
}

function StatsOverlay({
  mediaType,
  onBookmark,
}: {
  mediaType: TMediaType
  onBookmark: () => void
}) {
  return (
    <div className={`stats-overlay ${mediaType == 'video' && 'isVideo'}`}>
      <div className="feed-item-stats">
        <div className="feed-item-stat likes">
          <div className="icon-container">
            <i className="fa-fw fal fa-heart"></i>
          </div>
          2
        </div>
        <div className="feed-item-stat blue-1-hover-only" onClick={onBookmark}>
          <div className="icon-container">
            <i className="fal fa-bookmark"></i>
          </div>
        </div>
      </div>
    </div>
  )
}

function LockIconCentered() {
  return (
    <div className="lock-icon-centered">
      <div className="flex-row flex-align-center margin-bottom-2">
        <i className="fa-fw fas fa-lock"></i>
      </div>

      <div className="flex-row flex-align-center">
        <i className="fa-fw fas fa-camera"></i>
      </div>
    </div>
  )
}

function LockedTextContainerWrapper({ mediaType }: { mediaType: TMediaType }) {
  return (
    <div className="locked-text-container-wrapper">
      <div className="locked-text-container pointer font-size-xs">
        <div className="locked-text">
          Unlock {mediaType == 'image' ? 'Image' : 'Video'}
        </div>

        <div className="blue-1 media-type">
          {mediaType == 'image' ? (
            <i className="fa-fw fas fa-camera"></i>
          ) : (
            <i className="fa-fw fas fa-video"></i>
          )}
        </div>
        <div className="locked-icon">
          <i className="fa-fw fal fa-lock"></i>
          <i className="fa-fw fal fa-lock-open"></i>
        </div>
      </div>
    </div>
  )
}
