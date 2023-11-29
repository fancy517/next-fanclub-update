import LocalizationString from '@/components/common/LocalizationString'
import FCAccountAvatar from '@/components/common/account/FCAccountAvatar'
import FCAccountUsername from '@/components/common/account/FCAccountUsername'
import FCButtonNew from '@/components/common/button/FCButtonNew'
import Dropdown from '@/components/common/dropdown'
import { useModalMeta } from '@/contexts/modal'
import useOutsideClick from '@/hooks/useOutsideClick'
import { TAccount } from '@/types/account'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'

type Props = {
  children?: React.ReactNode
  className?: string
  isMobile: boolean
  account: TAccount
  [x: string]: any
}

export default function MessageContentHeader({
  children,
  className = '',
  account,
  isMobile,
  ...rest
}: Props) {
  const [open, setOpen] = useState(false)
  const button = useRef(null)
  const menu = useRef(null)
  useOutsideClick(button, menu, () => setOpen(false))

  const router = useRouter()
  const { push } = useModalMeta()
  const report = () => push({ id: 'reportcontent', data: {} })

  const username = (
    <FCAccountUsername
      maxLength={8}
      className="margin-left-text nopointers"
      account={account}
      hideUsername={true}
      showVerifiedBadge={false}
    />
  )

  return (
    <div
      className={`message-content-header border-color sm-mobile-hidden ${
        isMobile ? 'sm-mobile-visible' : 'sm-mobile-hidden'
      }`}
    >
      <div className="flex-col">
        <div className="flex-row">
          {!isMobile && (
            <>
              <Link href="/messages" className="back-button">
                <i className="fa-fw fal fa-arrow-left"></i>
              </Link>
              <div className="message-content-header-avatar">
                <FCAccountAvatar className="avatar flex-0" account={account} />
              </div>
            </>
          )}
          <div className="message-content-header-contact">
            <FCAccountUsername account={account} hideUsername={true} />
            <div className="flex-row flex-align-center content-header-sub-row">
              <div className="active-status font-size-xs dark-blue-1"></div>
              <div
                className="gallery-hot-icon dark-blue-1 font-size-xs blue-1-hover-only pointer"
                onClick={() => router.push(`/${account.userName}`)}
              >
                <i className="fa-light fa-images"></i> Gallery
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1"></div>
      <div className="flex-row">
        {/* dropdown */}
        <Dropdown
          className="feed-item-actions dropdown-trigger more-dropdown"
          open={open}
        >
          <div
            className="navigation-icon custom-hover-effect"
            onClick={() => setOpen(!open)}
            ref={button}
          >
            <i className="fa-fw fas fa-circle"></i>
            <i className="fa-fw fas fa-circle"></i>
            <i className="fa-fw fas fa-circle"></i>
          </div>
          <div
            className="dropdown-list fc-messages-conversation-route-content"
            ref={menu}
          >
            <div data-dropdown-value="xDD" className="dropdown-item">
              <div className="icon-stack">
                <i className="fal fa-comment"></i>
                <i className="fas fa-circle overlay top right blue-1"></i>
              </div>
              <LocalizationString>Mark as Unread</LocalizationString>
            </div>
            <FCButtonNew
              buttonContent={
                <div className="dropdown-item">
                  <i className="fa-fw fal fa-trash"></i>Hide Conversation
                </div>
              }
              confirmationContent={
                <div className="flex-row margin-top-1">
                  Do you want to Hide the Conversation?
                </div>
              }
              cb={() => {}}
            />
            <div className="dropdown-item" onClick={report}>
              <i className="fa-fw fal fa-flag"></i> Report This Conversation
            </div>
            <div className="dropdown-item">
              <i className="fa-fw fal fa-user-check"></i>
              <LocalizationString>Unmute</LocalizationString>
              {username}
            </div>
            <div className="dropdown-item">
              <i className="fa-fw fal fa-ban"></i>
              <LocalizationString>Block</LocalizationString>
              {username}
            </div>
            <div data-dropdown-value="xDD" className="dropdown-item">
              <i className="fa-fw fal fa-images"></i>
              Show Media from
              {username}
            </div>
            <div data-dropdown-value="xDD" className="dropdown-item">
              <i className="fa-fw fal fa-images"></i>
              Show My Media
            </div>

            <div data-dropdown-value="xDD" className="dropdown-item">
              <i className="fa-fw fal fa-xmark-octagon"></i>
              <LocalizationString>Unfollow</LocalizationString>
              {username}
            </div>
            <div className="dropdown-item">
              <i className="fa-fw fal fa-user-tag"></i>
              <LocalizationString>Subscribe to</LocalizationString>
              {username}
            </div>
            <div className="dropdown-item">
              <i className="fa-fw fal fa-note-sticky hover-effect"></i>
              <LocalizationString>Notes</LocalizationString>
            </div>
          </div>
        </Dropdown>
      </div>
    </div>
  )
}
