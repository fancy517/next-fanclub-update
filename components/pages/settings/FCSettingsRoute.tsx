'use client'

import LocalizationString from '@/components/common/LocalizationString'
import '@/styles/pages/settings.scss'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import FCSettingsAccountRoute from './FCSettingsAccountRoute'
import FCSettingsPrivacyRoute from './FCSettingsPrivacyRoute'
import FCSessionManagementRoute from './FCSessionManagementRoute'
import FCSettingsPaymentsRoute from './FCSettingsPaymentsRoute'
import FCSettingsDisplayRoute from './FCSettingsDisplayRoute'
import FCSettingsNotificationsRoute from './FCSettingsNotificationsRoute'
import { mockSessions } from '@/mock/sessions'
import FCSettingsAboutRoute from './FCSettingsAboutRoute'

type TSettingsPage =
  | 'home'
  | 'account'
  | 'privacy'
  | 'session'
  | 'payment'
  | 'display'
  | 'notification'
  | 'connection'
  | 'about'

type Props = {
  children?: React.ReactNode
  className?: string
  currentPage?: TSettingsPage
  [x: string]: any
}

const menuData = [
  {
    ref: '/settings/account',
    name: 'Account',
    icon: <i className="fa-fw margin-right-text fal fa-user-pen"></i>,
  },
  {
    ref: '/settings/privacy',
    name: 'Privacy & Safety',
    icon: <i className="fa-fw margin-right-text fal fa-user-shield"></i>,
  },
  {
    ref: '/settings/sessions',
    name: 'Session Management',
    icon: <i className="fa-fw margin-right-text fal fa-shield-check"></i>,
  },
  {
    ref: '/settings/payments',
    name: 'Payments',
    icon: <i className="fa-fw margin-right-text fal fa-credit-card"></i>,
  },
  {
    ref: '/settings/display',
    name: 'Display',
    icon: <i className="fa-fw margin-right-text fal fa-desktop"></i>,
  },
  {
    ref: '/settings/notifications',
    name: 'Notifications',
    icon: <i className="fa-fw margin-right-text fal fa-bell"></i>,
  },
  // {
  //   ref: '/settings/connections',
  //   name: 'Connections',
  //   icon: <i className="fa-fw fal margin-right-1 fa-user-shield"></i>,
  // },
  {
    ref: '/settings/about',
    name: 'About',
    icon: <i className="fa-fw fal margin-right-text fa-circle-info"></i>,
  },
]

const getMenuId = (page: TSettingsPage): number => {
  return menuData.findIndex((value) => value.ref.indexOf(page) != -1)
}

export default function FCSettingsRoute({
  children,
  className,
  currentPage = 'home',
  ...rest
}: Props) {
  const [page, setPage] = useState(currentPage)
  const menuId = getMenuId(page)
  const router = useRouter()

  useEffect(() => {}, [page])

  const goBack = () => {
    if (page == 'home') {
      router.push('/')
    } else {
      setPage('home')
    }
  }

  return (
    <div id="m_settings_route" className={`${className ?? ''}`} {...rest}>
      <div className="page-content">
        <div className="current-page-wrapper">
          <div className="current-page">
            <div
              className="flex-0 margin-right-2 pointer blue-1-hover-only"
              onClick={goBack}
            >
              <i className="fa-fw fal fa-chevron-left"></i>
            </div>
            <span>
              <LocalizationString>
                {page == 'home' ? 'Settings' : menuData[menuId].name}
              </LocalizationString>
            </span>
          </div>
        </div>

        {page == 'home' && (
          <div className="width-100">
            <div className="settings-list">
              {menuData.map((data, i) => (
                <Link
                  href={data.ref}
                  className="settings-item"
                  key={i}
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  {data.icon}
                  <LocalizationString>{data.name}</LocalizationString>
                  <div className="flex-1"></div>
                  <div className="flex-0 margin-right-1 margin-left-1">
                    <i className="fa-light fa-chevron-right"></i>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
        <div className="settings-content-wrapper">
          {/* <router-outlet></router-outlet> */}
          {page == 'account' && <FCSettingsAccountRoute />}
          {page == 'privacy' && <FCSettingsPrivacyRoute />}
          {page == 'session' && (
            <FCSessionManagementRoute />
          )}
          {page == 'payment' && <FCSettingsPaymentsRoute />}
          {page == 'display' && <FCSettingsDisplayRoute />}
          {page == 'notification' && <FCSettingsNotificationsRoute />}
          {page == 'about' && <FCSettingsAboutRoute />}
        </div>
      </div>
    </div>
  )
}
