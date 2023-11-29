'use client'

import '@/styles/pages/admin.scss'
import LocalizationString from '@/components/common/LocalizationString'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import AdminUsers from './AdminUsers'
import AdminApplications from './AdminApplications'
import AdminUserPost from './AdminUserPost'
import AdminUserMedia from './AdminUserMedia'
import AdminApplicationView from './AdminApplicationView'

type TAdminPage =
  | 'home'
  | 'users'
  | 'posts'
  | 'medias'
  | 'applications'
  | 'application'

type Props = {
  children?: React.ReactNode
  className?: string
  currentPage?: TAdminPage
  username?:string
  [x: string]: any
}

const menuData = [
  {
    ref: '/admin/users',
    name: 'Users',
    icon: <i className="fa-fw margin-right-text fal fa-users"></i>,
  },
  {
    ref: '/admin/applications',
    name: 'Applications',
    icon: <i className="fa-fw margin-right-text fal fa-users"></i>,
  },
]

const getMenuTitle = (page: TAdminPage): string => {
  if (page == 'medias') return 'User Medias'
  if (page == 'posts') return 'User Posts'
  if (page == 'applications') return 'All Applications'
  if (page == 'application') return 'Application'
  if (page == 'users') return 'Users'
  return 'Admin Dashboard'
}

export default function AdminDashboard({
  children,
  className,
  currentPage = 'home',
  username,
  ...rest
}: Props) {
  const [page, setPage] = useState(currentPage)
  const menuTitle = getMenuTitle(page)
  const router = useRouter()

  useEffect(() => {}, [page])

  const goBack = () => {
    if (page == 'home') {
      router.push('/')
    } else {
      if (page == 'application') {
        window.history.pushState(null, '', '/admin/applications')
        setPage('applications')
      } else if (page == 'medias' || page == 'posts') {
        window.history.pushState(null, '', '/admin/users')
        setPage('users')
      } else {
        window.history.pushState(null, '', '/admin/users')
        setPage('home')
      }
    }
  }

  return (
    <div id="m_admin_dashboard" className={`${className ?? ''}`} {...rest}>
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
              <LocalizationString>{menuTitle}</LocalizationString>
            </span>
          </div>
        </div>

        {page == 'home' && (
          <div className="width-100">
            <div className="admin-page-list">
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
          {page == 'users' && <AdminUsers />}
          {page == 'applications' && <AdminApplications />}
          {page == 'application' && <AdminApplicationView username={username} />}
          {page == 'posts' && <AdminUserPost />}
          {page == 'medias' && <AdminUserMedia />}
        </div>
      </div>
    </div>
  )
}
