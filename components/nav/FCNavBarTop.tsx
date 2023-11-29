'use client'

import Link from 'next/link'
import Image from 'next/image'

import { useEffect, useRef, useState } from 'react'

import { useModalMeta } from '@/contexts/modal'
import useOutsideClick from '@/hooks/useOutsideClick'
import { mockUser } from '@/mock/users'
import DarkLogo from '@/public/logos/fansly_dark_v3.webp'
import LightLogo from '@/public/logos/fansly_light_v3.webp'
import LogoOnly from '@/public/logos/fansly_logo_only.webp'

import FCAccountAvatar from '../common/account/FCAccountAvatar'
import FCAccountInfo from '../common/account/FCAccountInfo'
import FCThemeController from '../common/FCThemeController'
import LocalizationString from '../common/LocalizationString'
import FCWalletBalance from '../wallet/FCWalletBalance'
import FCWalletBalanceShop from '../wallet/FCWalletBalanceShop'
import { useGlobalContext } from '@/contexts/global'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth'
import { TAccount } from '@/types/account'
import { toast } from 'react-toastify'

type Props = {
  children?: React.ReactNode
  className?: string
  // loggedIn: boolean
  [x: string]: any
}

export const getNavLinks = () => {
  return [
    { href: '/explore', icon: <i className="fa-fw fal fa-magnifying-glass" /> },
    {
      href: '/messages',
      icon: <i className="fa-fw fal hover-effect fa-envelope" />,
    },
    {
      href: '#',
      icon: <i className="fa-fw fal hover-effect fa-plus-square" />,
      modal: true,
    },
    {
      href: '/notifications',
      icon: <i className="fa-fw fal hover-effect fa-bell" />,
    },
  ]
}

export const getDropdownMenu = (username: string) => {
  return [
    { href: '', name: '', icon: <></> },
    {
      href: `/${username}`,
      name: 'Profile',
      icon: <i className="fa-fw fal fa-user"></i>,
    },
    {
      href: '/subscriptions',
      name: 'Subscriptions',
      icon: <i className="fa-fw fal fa-user-crown"></i>,
    },
    {
      href: '/bookmarks',
      name: 'Media Collection',
      icon: <i className="fa-fw fal fa-images"></i>,
    },
    {
      href: '/lists',
      name: 'Lists',
      icon: <i className="fa-fw fal fa-list"></i>,
    },
    {
      href: '/bookmarks',
      name: 'Bookmarks',
      icon: <i className="fa-fw fal fa-bookmark"></i>,
    },
    {
      href: '/messages',
      name: 'Messages',
      icon: <i className="fa-fw fal fa-envelope"></i>,
    },
    {
      href: '/notifications',
      name: 'Notifications',
      icon: <i className="fa-fw fal fa-bell" />,
    },
    {
      href: '/creator',
      name: 'Creator Dashboard',
      icon: <i className="fa-fw fal fa-gauge-simple-max hover-effect" />,
    },
    {
      href: '/admin',
      name: 'Admin Dashboard',
      icon: <i className="fa-fw fal fa-gauge-simple-max" />,
    },
    {
      href: '/affiliates',
      name: 'Referrals',
      icon: <i className="fa-fw fal fa-people-arrows"></i>,
    },
    { href: '', name: '', icon: <></> },
    {
      href: '/settings/payments',
      name: 'Add Payment Method',
      icon: <i className="fa-fw fal fa-money-check-dollar-pen"></i>,
    },
    { href: '', name: '', icon: <></> },
    {
      href: '/application',
      name: 'Become A Model',
      icon: <i className="fa-fw fal fa-photo-film"></i>,
    },
    { href: '', name: '', icon: <></> },
    {
      href: '/tos',
      name: 'Terms',
      icon: <i className="fa-fw fal fa-book"></i>,
    },
    {
      href: '/privacy',
      name: 'Privacy Policy',
      icon: <i className="fa-fw fal fa-book"></i>,
    },
    { href: '', name: '', icon: <></> },
    {
      href: '/settings',
      name: 'Settings',
      icon: <i className="fa-fw fal fa-gear hover-effect"></i>,
    },
  ]
}

export default function FCNavBarTop({
  children,
  className = '',
  ...rest
}: Props) {
  // const user = mockUser
  const [open, setOpen] = useState(false)
  const [showShop, setShowShop] = useState(false)
  const router = useRouter()
  const { user, signOut } = useAuth()
  const loggedIn = user != null

  const onSignOut = () => {
    signOut()
  }
  const closeMenu = () => setOpen(false)

  const refButton = useRef(null)
  const refDropdown = useRef(null)
  useOutsideClick(refButton, refDropdown, closeMenu, false)

  const menus = getDropdownMenu(user?.userName ?? '')

  const { push } = useModalMeta()
  const showPostModal = () => {
    if (user?.userType === "creator" || user?.userType === "admin") {
      push({ id: 'postcreate', data: { reply: false } })
    } else {
      toast.warning("You are not allowed to post")
    }
  }

  const { openSideNav } = useGlobalContext()
  const navLinks = getNavLinks()

  useEffect(() => {
    if (!user) return
    console.log(user)
  }, [user])

  console.log("----user ---- ", user)
  return (
    <div className={`fc-nav-bar-top ${className}`}>
      {!loggedIn && (
        <div className="nav-content-wrapper not-logged-in">
          <Link href="/">
            <div className="logo">
              <Image
                src={DarkLogo}
                alt=""
                className="sm-mobile-hidden dark-theme-only"
              />
              <Image
                src={LightLogo}
                alt=""
                className="sm-mobile-hidden bright-theme-only"
              />
              <Image
                alt=""
                src={LogoOnly}
                className="sm-mobile-visible margin-left-1"
              />
            </div>
          </Link>
          <div className="flex-spacer"></div>
          <div className="btn margin-right-2" onClick={() => router.push('/')}>
            <LocalizationString>Login</LocalizationString>
          </div>
          <div className="btn margin-right-2" onClick={() => router.push('/')}>
            <LocalizationString>Sign up</LocalizationString>
          </div>
        </div>
      )}
      {loggedIn && (
        <div className="nav-content-wrapper logged-in">
          <div className="left-side">
            <div className="user-account sm-mobile-visible">
              <div
                className="avatar-container pointer noselect"
                onClick={openSideNav}
              >
                <FCAccountAvatar className="user-avatar" account={user} />
              </div>
            </div>

            <Link href={'/'} className="sm-mobile-hidden">
              <Logo />
            </Link>
          </div>

          <div className="middle-side">
            <Link href={'/'} className="sm-mobile-visible">
              <Logo />
            </Link>
          </div>

          <div className="right-side">
            {navLinks.map((link, index) =>
              link.modal ? (
                <div
                  key={index}
                  onClick={showPostModal}
                  className="nav-bar-item sm-mobile-hidden"
                >
                  <div className="tooltip">{link.icon}</div>
                </div>
              ) : (
                <Link
                  key={index}
                  href={link.href}
                  className="nav-bar-item sm-mobile-hidden"
                >
                  <div className="tooltip">{link.icon}</div>
                  {index == 1 && <div className="notification-badge">1</div>}
                </Link>
              ),
            )}

            {/* balance */}
            <div className={`balance-dropdown ${showShop && 'dropdown-open'}`}>
              <FCWalletBalance
                className="balance-component noselect pointer"
              // onClick={() => setShowShop(!showShop)}
              />
              <div className="dropdown-list width-19">
                <FCWalletBalanceShop />
              </div>
            </div>

            {/* show avatar */}
            <div
              className={`user-account sm-mobile-hidden ${open && 'dropdown-open'
                }`}
            >
              <div
                className="avatar-container pointer noselect"
                onClick={() => setOpen(!open)}
                ref={refButton}
              >
                <FCAccountAvatar className="user-avatar" account={user} />
              </div>

              <div className="user-account-dropdown noselect" ref={refDropdown}>
                <div className="dropdown-list">
                  <div className="dropdown-header">
                    <FCAccountInfo account={user} cb={(status: string) => { setOpen(!open) }} />
                  </div>

                  {menus.map((m, i) =>
                    m.name == '' ? (
                      <div
                        className="seperator border-bg-color margin-text"
                        key={i}
                      ></div>
                    ) : (
                      <Link
                        key={i}
                        href={m.href}
                        className="dropdown-item"
                        onClick={closeMenu}
                      >
                        {m.icon}
                        <LocalizationString>{m.name}</LocalizationString>
                      </Link>
                    ),
                  )}
                  {/* <Link href="/settings/display" className="dropdown-item">
                    <i className="fa-fw fal fa-globe" /> Language
                  </Link> */}
                  <FCThemeController
                    innerClassname="dropdown-item"
                    onClick={() => setOpen(false)}
                  />
                  <div className="seperator border-bg-color margin-text"></div>
                  <div
                    className="dropdown-item red-1-hover-only"
                    onClick={onSignOut}
                  >
                    <i className="fa-fw fal fa-right-from-bracket" />
                    <LocalizationString>Logout</LocalizationString>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Logo() {
  return (
    <div className="logo">
      <Image
        alt=""
        src={DarkLogo}
        className="sm-mobile-hidden dark-theme-only"
        height={40}
      />
      <Image
        alt=""
        src={LightLogo}
        className="sm-mobile-hidden bright-theme-only"
        height={40}
      />
      <Image
        alt=""
        src={LogoOnly}
        className="sm-mobile-visible margin-left-1"
        height={24}
      />
    </div>
  )
}
