'use client'

import { usePathname } from 'next/navigation'
import FCNavBarMobile from './nav/FCNavBarMobile'
import FCNavBarTop from './nav/FCNavBarTop'
import classNames from 'classnames'
import ModalWrapper from './ModalWrapper'
import { ModalContextProvider } from '@/contexts/modal'
import { GlobalWrapper } from '@/contexts/global'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '@/contexts/auth'
import { TAccount } from '@/types/account'

import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { PaymentWrapper } from '@/contexts/payment'

type Props = {
  children?: React.ReactNode
  [x: string]: any
}

export default function AppRoot({ children, ...rest }: Props) {
  const pathname = usePathname()
  const isMessagesWindow = pathname.indexOf('/messages') == 0
  const isPostWindow = pathname.indexOf('/post/') == 0
  const isForyouWindow = pathname.indexOf('explore/foryou') != -1
  // const isPasswordResetWindow = pathname.indexOf('/passwordreset/') != -1
  const isHome = pathname == '/'
  const [isLoggedIn, setLoggedIn] = useState(false)
  const hideNavTopbar = !isLoggedIn && isHome
  const invisibleTopbar = isMessagesWindow || isPostWindow
  const [user, setUser] = useState<TAccount | null>(null)

  const getMe = async () => {
    try {
      const { data } = await axios.get('/api/me')
      console.log("-----ME -----", data)
      if (data.success == true) {
        setLoggedIn(true)
        setUser(data)
      }
    } catch (error) { }
  }

  const signOut = async () => {
    await axios.post('/api/logout')
    window.location.href = "/"
  }

  useEffect(() => {
    const theme = window.localStorage.getItem("theme") ? window.localStorage.getItem("theme") : "dark-theme"
    window.localStorage.setItem("theme", theme || "dark-theme")
    const item = document.getElementsByTagName('html').item(0)
    if (item) item.className = theme || "dark-theme"
    getMe()
  }, [])

  const scroll2Top = () => window.scrollTo(0, 0)

  return (
    <div id="app_root">
      <AuthContext.Provider value={{ user, signOut }}>
        <ModalContextProvider>
          <PaymentWrapper>
            <GlobalWrapper>
              <div
                className={classNames(
                  'site-wrapper nav-bar-visible',
                  { 'nav-bar-top-visible': !invisibleTopbar },
                  { 'is-for-you-route': isForyouWindow },
                )}
              >
                <FCNavBarTop
                  loggedIn={isLoggedIn}
                  className={classNames(
                    { 'app-mobile-hidden': invisibleTopbar },
                    { hidden: hideNavTopbar },
                  )}
                />
                <div className="content-wrapper">
                  {/* below div is mandatory; this is originated from fansly.com element structure; since fansly is Angular based */}
                  <div id="m_router_outlet"></div>
                  {children}
                </div>
                <FCNavBarMobile />
              </div>

              {/* <div className="scroll-top-button pointer" onClick={scroll2Top}>
              <i className="fa-fw fal fa-chevron-up"></i>
            </div> */}

              {/* <div className="alert-wrapper"></div> */}
              <ToastContainer />
              <ModalWrapper />
            </GlobalWrapper>
          </PaymentWrapper>
        </ModalContextProvider>
      </AuthContext.Provider>
    </div>
  )
}
