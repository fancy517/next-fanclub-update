'use client'

import { TAccount } from '@/types/account'
import FCAccountAvatar from '../account/FCAccountAvatar'
import FCAccountMedia from '../account/FCAccountMedia'
import FCAccountUsername from '../account/FCAccountUsername'
import FCAccountMediaBundleGallery from './FCAccountMediaBundleGallery'
import { TMedia } from '@/types/media'
import { useRef, useState } from 'react'
import Dropdown from '../dropdown'
import useOutsideClick from '@/hooks/useOutsideClick'
import { useRouter } from 'next/navigation'
import { useModalMeta } from '@/contexts/modal'
import FCMediaOfferSuggestionsComments from '@/components/pages/explore/FCMediaOfferSuggestionsComments'

type Props = {
  children?: React.ReactNode
  className?: string
  account: TAccount
  media: TMedia
  isBundle?: boolean
  onScrollUp: () => void
  onScrollDown: () => void
  [x: string]: any
}

export default function MediaWrapper({
  children,
  className = '',
  account,
  media,
  isBundle,
  onScrollDown,
  onScrollUp,
  ...rest
}: Props) {
  const [open, setOpen] = useState(false)
  const [showComment, setShowComment] = useState(false)
  const dot = useRef(null)
  const list = useRef(null)
  useOutsideClick(dot, list, () => setOpen(false))

  const router = useRouter()

  // actions
  const { push } = useModalMeta()
  const report = () => push({ id: 'reportcontent', data: {} })
  const sendTip = () => push({ id: 'createtip', data: { account, tip_type: "USER" } })
  const bookmark = () => push({ id: 'uservaultalbumselect', data: {} })
  const toggleComment = () => setShowComment(!showComment)

  return (
    <div
      className="media-wrapper"
      style={{ backgroundColor: 'black' }}
      {...rest}
    >
      {isBundle ? (
        <FCAccountMediaBundleGallery />
      ) : (
        <FCAccountMedia data={media} />
      )}

      {/* Social Overlay */}
      <div className="social-overlay">
        <div className="feed-item-stats">
          <div className="feed-item-stat for-dropdown">
            <Dropdown className="more-dropdown" open={open}>
              <div
                className="icon-container"
                ref={dot}
                onClick={() => setOpen(!open)}
              >
                <i className="fas fa-ellipsis"></i>
              </div>
              <div className="dropdown-list" ref={list}>
                <div className="dropdown-item">
                  <i className="fas fa-check blue-1"></i> High Quality Media
                </div>
                <div className="dropdown-item" onClick={report}>
                  <i className="fa-fw fal fa-flag"></i> Report This Media
                </div>
                <div className="dropdown-item">
                  <i className="fa-fw fal fa-ban"></i> Stop recommending this
                  Creator
                </div>
              </div>
            </Dropdown>
          </div>

          <div
            data-routerlink="/search"
            className="feed-item-stat"
            onClick={() => router.push('/search')}
          >
            <div className="icon-container">
              <i className="fa-light fa-magnifying-glass nav-icon search-icon"></i>
            </div>
          </div>

          <div className="flex-1"></div>
          <div className="feed-item-stat">
            <div className="icon-container" onClick={onScrollUp}>
              <i className="fal fa-chevron-up nav-icon"></i>
            </div>
          </div>
          <div className="feed-item-stat">
            <div className="icon-container" onClick={onScrollDown}>
              <i className="fal fa-chevron-down nav-icon"></i>
            </div>
          </div>
          <div className="feed-item-spacer"></div>
          <div className="feed-item-stat pointer">
            <div className="follow-container">
              <FCAccountAvatar account={account} hideOnlineIndicator />
              <div className="follow-icon">
                <i className="fas fa-fw fa-square-plus"></i>
              </div>
            </div>
          </div>
          <div className="feed-item-stat blue-1-hover-only" onClick={sendTip}>
            <div className="icon-container">
              <i className="fa-fw fas fa-comment-dollar"></i>
            </div>
          </div>
          <div className="feed-item-stat likes" onClick={toggleComment}>
            <div className="icon-container">
              <i className="fa-fw fas fa-comment"></i>
            </div>
            <span className="feed-item-stat-number">0</span>
          </div>
          <div className="feed-item-stat likes">
            <div className="icon-container">
              <i className="fa-fw fas fa-heart"></i>
            </div>
            <span className="feed-item-stat-number">6</span>
          </div>
          <div className="feed-item-stat blue-1-hover-only">
            <div className="icon-container" onClick={bookmark}>
              <i className="fa-fw fas fa-bookmark"></i>
            </div>
          </div>
          <div className="feed-item-spacer"></div>
        </div>
      </div>

      {/* Post text */}
      <div className="post-text-container-backdrop">
        <div className="username-container">
          <FCAccountAvatar
            className="pointer"
            account={account}
            hideOnlineIndicator={true}
          />
          <FCAccountUsername
            className="pointer margin-left-1"
            account={account}
            maxLength={11}
          />
        </div>

        <div className="post-text-container">
          Estas dos conejitas quieren saltar encima de tu polla 🍆 Te gustaría
          unirte ?<div className="pointer semi-bold view-post">(View Post)</div>
        </div>
      </div>

      {showComment && (
        <FCMediaOfferSuggestionsComments
          account={account}
          onClose={toggleComment}
        />
      )}
    </div>
  )
}
