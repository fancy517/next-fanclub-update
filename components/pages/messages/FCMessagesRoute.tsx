'use client'

import '@/styles/pages/messages.scss'
import LocalizationString from '@/components/common/LocalizationString'
import FCAccountAvatar from '@/components/common/account/FCAccountAvatar'
import FCMessagesDefaultConversationRoute from './FCMessagesDefaultConversationRoute'
import { useRef, useState } from 'react'
import { mockUser } from '@/mock/users'
import Link from 'next/link'
import FCMessagingGroup from './FCMessagingGroup'
import { TConversation } from '@/types/message'
import FCMessagesConversationRoute from './FCMessagesConversationRoute'
import { TAccount } from '@/types/account'
import { useModalMeta } from '@/contexts/modal'
import FCButtonNew from '@/components/common/button/FCButtonNew'
import useOutsideClick from '@/hooks/useOutsideClick'
import Dropdown from '@/components/common/dropdown'
import classNames from 'classnames'

type Props = {
  children?: React.ReactNode
  className?: string
  conversations: Array<TConversation>
  conversationId?: string
  account?: TAccount
  [x: string]: any
}

export default function FCMessagesRoute({
  children,
  className,
  conversations,
  conversationId,
  account,
  ...rest
}: Props) {
  const user = mockUser

  const { push } = useModalMeta()
  const [sortBy, setSortBy] = useState(0)
  const [showSortDropdown, setShowSortDropdown] = useState(false)

  const [mobileNav, setMobileNav] = useState(false)
  const refNavTrigger = useRef(null)
  const refDropdown = useRef(null)
  useOutsideClick(refNavTrigger, refDropdown, () => setMobileNav(false))

  const [loading, setLoading] = useState(false)
  const [contactFilter, setContactFilter] = useState(2)

  const showNewMsgModal = () => push({ id: 'newmessage', data: '' })

  const markAsAllRead = () => {}

  const reloadContacts = async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLoading(false)
  }

  return (
    <div id="m_messages_route" className={`${className}`} {...rest}>
      {/* Message Route header */}
      {!conversationId && (
        <div className="message-route-header sm-mobile-visible">
          <div className="message-route-header-left">
            <div className="user-account sm-mobile-visible">
              <div className="avatar-container pointer noselect">
                <FCAccountAvatar className="user-avatar" account={user} />
              </div>
            </div>
          </div>
          <div className="message-route-header-center">
            <span className="bold">Messages</span>
          </div>
          <div className="message-route-header-right">
            <Dropdown className="transparent-dropdown" open={mobileNav}>
              <div
                className="dropdown-text"
                ref={refNavTrigger}
                onClick={() => setMobileNav(!mobileNav)}
              >
                <div className="navigation-icon">
                  <i className="fa-fw fas fa-circle" />
                  <i className="fa-fw fas fa-circle" />
                  <i className="fa-fw fas fa-circle" />
                </div>
              </div>
              <div
                className="dropdown-list fc-messages-route-inner"
                ref={refDropdown}
              >
                <div className="dropdown-item" onClick={markAsAllRead}>
                  <i className="fa-light fa-envelope-circle-check" />
                  <LocalizationString>Mark all as read</LocalizationString> (0)
                </div>
              </div>
            </Dropdown>
          </div>
        </div>
      )}

      {/* begin; page content */}
      <div className={`page-content ${conversationId ? 'active-group' : ''}`}>
        <div className="messages-wrapper">
          <div className="messages-list-wrapper border-color">
            <div className="messages-top-header border-color sm-mobile-hidden">
              <span className="flex-1">
                <LocalizationString>Messages</LocalizationString>
              </span>

              <FCButtonNew
                buttonContent={
                  <div className="btn small outline-dark-blue mark-read-btn margin-right-1">
                    <LocalizationString>Mark all as read</LocalizationString>{' '}
                    (1)
                  </div>
                }
                confirmationContent={
                  <div className="flex-row margin-top-1">
                    Do you want to mark all your messages as read?
                  </div>
                }
                cb={markAsAllRead}
              />
              <div
                className="stacked-icons new-message-btn"
                onClick={showNewMsgModal}
              >
                <i className="fa-fw fal fa-envelope hover-effect"></i>
                <i className="fa-fw fal fa-circle-plus"></i>
              </div>
            </div>
            <div className="message-search">
              <div className="search-input-container">
                <div className="material-input icon-left">
                  <div className="icon-left">
                    <i className="fa-fw fal fa-magnifying-glass"></i>
                  </div>
                  <input
                    type="text"
                    required={true}
                    className="ng-untouched ng-pristine ng-invalid"
                  />
                  <div className="placeholder">
                    <LocalizationString>e.g. SuperFan123</LocalizationString>
                  </div>
                  <div className="label">
                    <LocalizationString>
                      Search Conversations
                    </LocalizationString>
                  </div>
                </div>
              </div>
              <div
                className={`transparent-dropdown margin-left-1 margin-right-1 margin-top-3 ${
                  showSortDropdown && 'dropdown-open'
                }`}
              >
                <div
                  className="dropdown-title"
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                >
                  <div className="icon-stack">
                    <i className="fa-fw fas fa-arrow-down-wide-short hover-effect"></i>
                    <i className="fal fa-clock overlay bottom right blue-1"></i>
                  </div>
                </div>
                <div className="dropdown-list fc-messages-route-inner">
                  <div
                    className={`dropdown-item ${sortBy == 0 && 'selected'}`}
                    onClick={() => setSortBy(0)}
                  >
                    <div className="icon-stack">
                      <i className="fa-fw fas fa-arrow-down-wide-short hover-effect"></i>
                      <i className="fal fa-clock overlay bottom right blue-1"></i>
                    </div>
                    <LocalizationString>Newest</LocalizationString>
                  </div>

                  <div
                    className={`dropdown-item ${sortBy == 1 && 'selected'}`}
                    onClick={() => setSortBy(1)}
                  >
                    <div className="icon-stack">
                      <i className="fa-fw fas fa-arrow-up-wide-short hover-effect"></i>
                      <i className="fal fa-clock overlay bottom right blue-1"></i>
                    </div>
                    <LocalizationString>Oldest</LocalizationString>
                  </div>

                  <div
                    className={`dropdown-item ${sortBy == 2 && 'selected'}`}
                    onClick={() => setSortBy(2)}
                  >
                    <div className="icon-stack">
                      <i className="fa-fw fas fa-arrow-down-wide-short hover-effect"></i>
                      <i className="fas fa-circle overlay bottom right blue-1"></i>
                    </div>
                    <LocalizationString>Unread</LocalizationString>
                  </div>
                </div>
              </div>
            </div>
            <div className="messages-nav-wrapper">
              <div className="message-list-header">
                <div className="tab-nav-wrapper font-size-sm">
                  <div className="bubble-wrap">
                    {['Followed', 'Subscribed', 'All'].map((item, index) => (
                      <div
                        className={`bubble ${
                          index == contactFilter && 'active'
                        }`}
                        onClick={() => setContactFilter(index)}
                        key={index}
                      >
                        <LocalizationString>{item}</LocalizationString>
                        {index != 1 && (
                          <div className="badge">
                            <span>1</span>
                          </div>
                        )}
                      </div>
                    ))}
                    <div className="bubble" onClick={reloadContacts}>
                      <i
                        className={classNames(
                          'fal fa-arrows-rotate pointer blue-1',
                          { 'fa-spin': loading },
                        )}
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="message-list noselect">
              <div className="spacer" style={{ height: 0 }}></div>

              {loading ? (
                <div className="flex-row flex-center dark-blue-1 margin-top-2">
                  <i className="fal fa-circle-notch fa-spin fa-2x"></i>
                </div>
              ) : conversations.length == 0 ? (
                <div className="text-center dark-blue-1 font-size-sm">
                  <LocalizationString>No conversations</LocalizationString>
                </div>
              ) : (
                conversations.map((c, index) => (
                  <Link
                    href={`/messages/${c.id}`}
                    key={index}
                    className={classNames({ selected: c.id == conversationId })}
                  >
                    <FCMessagingGroup
                      className="message border-color"
                      conversation={c}
                      unread={index == 0 ? 1 : 0}
                    />
                  </Link>
                ))
              )}

              <div className="spacer" style={{ height: 0 }}></div>
            </div>
          </div>
          <div className="messages-content-wrapper">
            {/* <router-outlet ></router-outlet> */}
            {conversationId ? (
              <FCMessagesConversationRoute account={account!} />
            ) : (
              <FCMessagesDefaultConversationRoute onNewMsg={showNewMsgModal} />
            )}
          </div>
        </div>
      </div>

      <div
        className="sm-mobile-visible mobile-new-mass-dm-button"
        onClick={showNewMsgModal}
      >
        <div className="stacked-icons new-message-btn">
          <i className="fa-fw fal fa-envelope hover-effect"></i>
          <i className="fa-fw fal fa-circle-plus"></i>
        </div>
      </div>
    </div>
  )
}
