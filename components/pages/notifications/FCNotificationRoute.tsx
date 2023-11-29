'use client'

import '@/styles/pages/notifications.scss'
import LocalizationString from '../../common/LocalizationString'
import NotificationFilterDropdown from './NotificationFilterDropdown'
import { TNotification } from '@/types'
import FCFollowNotification from './FCFollowNotification'
import FCPostLikeNotification from './FCPostLikeNotification'
import FCPostReplyNotification from './FCPostReplyNotification'
import FCPlanPromotionStartedNotification from './FCPlanPromotionStartedNotification'
import FCSubscriptionExpireNotification from './FCSubscriptionExpireNotification'
import { useState } from 'react'

type Props = {
  children?: React.ReactNode
  data: Array<TNotification>
  [x: string]: any
}

export default function FCNotificationRoute({ data, ...rest }: Props) {
  const [loading, setLoading] = useState(true)

  return (
    <div id="m_notification_route">
      <div className="page-content">
        <div className="current-page-wrapper">
          <div className="current-page flex-row">
            <span className="flex-1">
              <LocalizationString>Notifications</LocalizationString>
            </span>
            <NotificationFilterDropdown />
          </div>
        </div>
        <div className="notifications-list-wrapper">
          <div className="notifications-list">
            {data.length == 0 && (
              <div className="dark-blue-1 text-center margin-top-1">
                <LocalizationString>
                  Nothing to see here yet, your notifications will be displayed
                  here.
                </LocalizationString>
              </div>
            )}

            <div className="spacer" style={{ height: 0 }}></div>
            {data.map((ntf) => (
              <div className="notification-wrapper" key={ntf.id}>
                {ntf.type == 'follow' && (
                  <FCFollowNotification
                    className="notification border-color"
                    data={ntf}
                  />
                )}

                {ntf.type == 'postlike' && (
                  <FCPostLikeNotification
                    className="notification border-color"
                    data={ntf}
                  />
                )}

                {ntf.type == 'postreply' && (
                  <FCPostReplyNotification
                    key={ntf.id}
                    className="notification border-color"
                    data={ntf}
                  />
                )}

                {ntf.type == 'planstarted' && (
                  <FCPlanPromotionStartedNotification
                    key={ntf.id}
                    className="notification border-color"
                    data={ntf}
                  />
                )}

                {ntf.type == 'subscriptionexpire' && (
                  <FCSubscriptionExpireNotification
                    key={ntf.id}
                    className="notification border-color"
                    data={ntf}
                  />
                )}
              </div>
            ))}
            <div className="spacer" style={{ height: 0 }}></div>
          </div>

          {loading && (
            <div className="timeline-spacer">
              <i className="fa-fw fa fa-spinner fa-spin"></i>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
