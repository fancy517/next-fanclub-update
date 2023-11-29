'use client'

import LocalizationString from '@/components/common/LocalizationString'
import './dashboard.scss'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import DashboardPlans from './DashboardPlans'
import DashboardSubscribers from './DashboardSubscribers'
import DashboardUploads from './DashboardUploads'
import DashboardVault from './DashboardVault'
import DashboardTopSupporters from './DashboardTopSupporters'
import DashboardEarnings from './DashboardEarnings'

type TDashboardPage =
  | 'home'
  | 'plans'
  | 'subscribers'
  | 'uploads'
  | 'vault'
  | 'earnings'
  | 'supporters'

type Props = {
  children?: React.ReactNode
  className?: string
  currentPage?: TDashboardPage
  [x: string]: any
}

const menuData = [
  {
    ref: '/creator/plans',
    name: 'Plans',
    icon: <i className="fa-fw margin-right-text fal fa-user-pen"></i>,
  },
  {
    ref: '/creator/subscribers',
    name: 'Subscribers',
    icon: <i className="fa-fw margin-right-text fal fa-users"></i>,
  },
  {
    ref: '/creator/uploads',
    name: 'Uploads',
    icon: <i className="fa-fw margin-right-text fal fa-upload"></i>,
  },
  {
    ref: '/creator/vault',
    name: 'Vault',
    icon: <i className="fa-fw margin-right-text fal fa-photo-video"></i>,
  },
  {
    ref: '/creator/earnings',
    name: 'Earnings',
    pageTitle: 'Earnings/Wallet',
    icon: <i className="fa-fw margin-right-text fal fa-sack-dollar"></i>,
  },
  {
    ref: '/creator/supporters',
    name: 'Top Supporters',
    icon: <i className="fa-fw margin-right-text fal fa-user-group-crown"></i>,
  },
]

const getMenuId = (page: TDashboardPage): number => {
  return menuData.findIndex((value) => value.ref.indexOf(page) != -1)
}

export default function DashboardMain({
  children,
  className = '',
  currentPage = 'home',
  ...rest
}: Props) {
  const [page, setPage] = useState(currentPage)
  const menuId = getMenuId(page)
  const router = useRouter()

  const goBack = () => {
    if (page == 'home') {
      router.push('/')
    } else {
      setPage('home')
      window.history.pushState(null, '', '/creator')
    }
  }

  const go2page = (i: number) => () => {
    router.push(menuData[i].ref)
  }

  return (
    <div id="m_creator_dashboard" className={`${className}`} {...rest}>
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
                {page == 'home'
                  ? 'Creator Dashboard'
                  : menuData[menuId].pageTitle ?? menuData[menuId].name}
              </LocalizationString>
            </span>
          </div>
        </div>

        {page == 'home' && (
          <div className="width-100">
            <div className="dashboard-list">
              {menuData.map((data, i) => (
                <div onClick={go2page(i)} className="dashboard-item" key={i}>
                  {data.icon}
                  <LocalizationString>{data.name}</LocalizationString>
                  <div className="flex-1"></div>
                  <div className="flex-0 margin-right-1 margin-left-1">
                    <i className="fa-light fa-chevron-right"></i>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="dashboard-content-wrapper">
          {page == 'plans' && <DashboardPlans />}
          {page == 'subscribers' && <DashboardSubscribers />}
          {page == 'uploads' && <DashboardUploads />}
          {page == 'vault' && <DashboardVault />}
          {page == 'earnings' && <DashboardEarnings />}
          {page == 'supporters' && <DashboardTopSupporters />}
        </div>
      </div>
    </div>
  )
}
