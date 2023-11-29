import '@/styles/components/nav/side.scss'

import { mockUser } from '@/mock/users'
import FCAccountInfo from '../common/account/FCAccountInfo'
import LocalizationString from '../common/LocalizationString'
import FCThemeController from '../common/FCThemeController'
import { useRouter } from 'next/navigation'

type Props = {
  children?: React.ReactNode
  className?: string
  onClose: () => void
  [x: string]: any
}

export default function FCNavMenuSide({
  children,
  className = '',
  onClose,
  ...rest
}: Props) {
  const router = useRouter()
  const go2page = (link: string) => () => {
    router.push(link)
    onClose()
  }

  return (
    <div className={`fc-nav-menu-side ${className}`} {...rest}>
      <div className="flex-col">
        <div className="list">
          <div className="dropdown-header">
            <FCAccountInfo account={mockUser} />
          </div>
          <div className="seperator border-bg-color margin-text"></div>
          <div className="dropdown-item" tabIndex={0}>
            <i className="fa-fw fal fa-user"></i>
            <LocalizationString>Profile</LocalizationString>
          </div>
          <div
            onClick={go2page('/subscriptions')}
            className="dropdown-item"
            tabIndex={0}
          >
            <i className="fa-fw fal fa-user-crown"></i>
            <span>
              <LocalizationString>Subscriptions</LocalizationString>
            </span>
          </div>
          <div
            onClick={go2page('/bookmarks/2007')}
            className="dropdown-item"
            tabIndex={0}
          >
            <i className="fa-fw fal fa-images"></i>
            <span>
              <LocalizationString>Media Collection</LocalizationString>
            </span>
          </div>
          <div
            onClick={go2page('/lists/')}
            className="dropdown-item"
            tabIndex={0}
          >
            <i className="fal fa-fw fa-list"></i>
            <span>
              <LocalizationString>Lists</LocalizationString>
            </span>
          </div>
          <div
            onClick={go2page('/bookmarks/')}
            className="dropdown-item"
            tabIndex={0}
          >
            <i className="fal fa-fw fa-bookmark"></i>
            <span>
              <LocalizationString>Bookmarks</LocalizationString>
            </span>
          </div>
          <div
            onClick={go2page('/messages/')}
            className="dropdown-item"
            tabIndex={0}
          >
            <i className="fa-fw fal fa-envelope"></i>
            <span>
              <LocalizationString>Messages</LocalizationString>
            </span>
          </div>
          <div
            onClick={go2page('/notifications/')}
            className="dropdown-item"
            tabIndex={0}
          >
            <i className="fa-fw fal fa-bell"></i>
            <span>
              <LocalizationString>Notifications</LocalizationString>
            </span>
          </div>

          <div
            onClick={go2page('/affiliates/')}
            className="dropdown-item"
            tabIndex={0}
          >
            <i className="fa-fw fal fa-people-arrows"></i>
            <span>
              <LocalizationString>Referrals</LocalizationString>
            </span>
          </div>
          <div className="seperator border-bg-color margin-text"></div>
          <div
            onClick={go2page('/settings/payments')}
            className="dropdown-item"
            tabIndex={0}
          >
            <i className="fa-fw fal fa-money-check-dollar-pen"></i>
            <span>
              <LocalizationString>Add Payment Method </LocalizationString>
            </span>
          </div>
          <div className="seperator border-bg-color margin-text"></div>
          <div
            onClick={go2page('/application')}
            className="dropdown-item"
            tabIndex={0}
          >
            <i className="fa-fw fal fa-photo-film"></i>
            <span>
              <LocalizationString>Become A Model</LocalizationString>
            </span>
          </div>
          <a
            href="https://help.fansly.com"
            target="_blank"
            className="dropdown-item"
          >
            <i className="fa-fw fal fa-book"></i>
            <span>Help Center</span>
          </a>
          <div className="seperator border-bg-color margin-text"></div>
          <div onClick={go2page('/tos')} className="dropdown-item" tabIndex={0}>
            <i className="fa-fw fal fa-book"></i>
            <span>
              <LocalizationString>Terms</LocalizationString>
            </span>
          </div>
          <div
            onClick={go2page('/privacy')}
            className="dropdown-item"
            tabIndex={0}
          >
            <i className="fa-fw fal fa-book"></i>
            <span>
              <LocalizationString>Privacy Policy</LocalizationString>
            </span>
          </div>
          <div className="seperator border-bg-color margin-text"></div>
          <div
            onClick={go2page('/settings')}
            className="dropdown-item"
            tabIndex={0}
          >
            <i className="fa-fw fal hover-effect fa-gear"></i>
            <LocalizationString>Settings</LocalizationString>
          </div>
          <div
            onClick={go2page('/settings/display')}
            className="dropdown-item"
            tabIndex={0}
          >
            <i className="fa-fw fal fa-globe"></i> Language
          </div>
          <FCThemeController innerClassname="dropdown-item" onClick={onClose} />
          <div className="seperator border-bg-color margin-text"></div>
          <div className="dropdown-item red-1-hover-only">
            <i className="fa-fw fal fa-right-from-bracket"></i>
            <LocalizationString>Logout</LocalizationString>
          </div>
        </div>
      </div>
    </div>
  )
}
