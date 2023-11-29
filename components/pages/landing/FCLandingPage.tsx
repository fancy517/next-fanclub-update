'use client'
import LocalizationString from '@/components/common/LocalizationString'
import FCButton from '@/components/common/button/FCButton'
import '@/styles/pages/landing.scss'
import DarkLogo from '@/public/logos/fansly_dark_v3.webp'
import LightLogo from '@/public/logos/fansly_light_v3.webp'
import Image from 'next/image'
import { useModalMeta } from '@/contexts/modal'
import Link from 'next/link'
import axios from 'axios'
import { cookies } from 'next/headers'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast} from 'react-toastify'
import { usePaymentContext } from '@/contexts/payment'

type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function FCLandingPage({
  children,
  className = '',
  ...rest
}: Props) {


  const { push } = useModalMeta()
  const showModal = (mode: number) => () => push({ id: 'login', data: mode })
  const showForgotModal = () => {
    push({ id: 'forgotpassword', data: '' })
  }

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const login = async () => {
    if (email === '' || password === '') {
      toast.warning('Please enter your email and password')
      return
    } else {
      const { data } = await axios.post('api/login', { email, password })
      if (data.success === 'success') {
        window.location.reload()
      } else {
        toast.error('Authentication failed')
      }
    }
  }

  useEffect(() => {
    const isNewbie = window.localStorage.getItem('isNewbie') !== 'false'
    if (isNewbie) {
      push({ id: 'agegate', data: {} })
    }
  }, [])

  return (
    <div className={`fc-landing-page ${className}`} {...rest}>
      <div className="page-content">
        <div className="landing-page">
          <div className="landing-left">
            <div className="banner dark-theme-only"></div>
            <div className="banner-bright bright-theme-only"></div>
            <Image src={DarkLogo} className="dark-theme-only logo" alt="" />
            <Image src={LightLogo} className="bright-theme-only logo" alt="" />
          </div>
          <div className="landing-right">
            <div className="login-menu">
              <div className="error-text red-1"></div>
              <div className="login-form">
                <div className="username-container">
                  <div className="material-input">
                    <input
                      type="text"
                      required
                      name="username"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="ng-untouched ng-pristine ng-invalid"
                      onBlur={(e) => {
                        if (email.length === 0) {
                          e.target.classList.add('ng-error')
                        } else {
                          e.target.classList.remove('ng-error')
                        }
                      }}
                    />
                    <div className="placeholder">
                      <LocalizationString>
                        Enter username or email
                      </LocalizationString>
                    </div>
                    <div className="label">
                      <LocalizationString>Username / Email</LocalizationString>
                    </div>
                  </div>
                </div>
                <div className="password-container">
                  <div className="material-input">
                    <input
                      required
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="ng-untouched ng-pristine ng-invalid"
                      onBlur={(e) => {
                        if (password.length === 0) {
                          e.target.classList.add('ng-error')
                        } else {
                          e.target.classList.remove('ng-error')
                        }
                      }}
                    />
                    <div className="placeholder">
                      <LocalizationString>Enter Password</LocalizationString>
                    </div>
                    <div className="label">
                      <LocalizationString>Password</LocalizationString>
                    </div>
                  </div>
                  <span
                    className="current-password pointer dark-blue-1 font-size-xs blue-1-hover-only"
                    onClick={showForgotModal}
                  >
                    <LocalizationString>Forgot password?</LocalizationString>
                  </span>
                </div>
                <FCButton
                  className="btn outline-blue large margin-top-1"
                  onClick={login}
                >
                  <LocalizationString>Login</LocalizationString>
                </FCButton>
              </div>
            </div>
            <div className="right-content padding-left-1 padding-right-1">
              <div className="btn solid-blue large" onClick={showModal(2)}>
                <LocalizationString>Sign up</LocalizationString>
              </div>
              <div className="btn outline-blue large" onClick={showModal(1)}>
                <LocalizationString>Login</LocalizationString>
              </div>
              <div className="seperator"></div>
              <div className="disclaimer">
                <LocalizationString className="margin-right-text">
                  By joining, you agree to our
                </LocalizationString>
                <a
                  href="https://fansly.com/tos"
                  target="_blank"
                  data-data-routerlink="/tos"
                >
                  <LocalizationString className="margin-right-text">
                    &nbsp;Terms &amp; Conditions &nbsp;
                  </LocalizationString>
                </a>
                <LocalizationString className="margin-right-text">
                  and
                </LocalizationString>
                <a
                  href="https://fansly.com/privacy"
                  target="_blank"
                  data-data-routerlink="/privacy"
                >
                  <LocalizationString>&nbsp;Privacy Policy</LocalizationString>
                </a>
                , and confirm that you are at least 18 years old.
              </div>
              {/* <div className="flex-row login-provider btn large Twitter">
                <div className="icon-container">
                  <i className="fab fa-twitter"></i>
                </div>
                <div className="flex-1 text-center"> Sign in with Twitter </div>
              </div>
              <div className="flex-row login-provider btn large Google">
                <div className="icon-container google-icon-background">
                  <img
                    src="./login_files/google_icon.svg"
                    width="21"
                    height="21"
                  />
                </div>

                <div className="flex-1 text-center"> Sign in with Google </div>
              </div>
              <div className="flex-row login-provider btn large Twitch">
                <div className="icon-container">
                  <i className="fab fa-twitch"></i>
                </div>
                <div className="flex-1 text-center"> Sign in with Twitch </div>
              </div> */}
            </div>
          </div>
        </div>
        <div className="landing-footer">
          <div className="flex-1 flex-col semi-bold sm-mobile-visible margin-right-1">
            <div className="nowrap"> © 2023 Fansly </div>
            <div
              data-data-routerlink="/contact"
              className="footer-item margin-top-1"
              tabIndex={0}
            >
              <LocalizationString>Contact</LocalizationString>
            </div>
            {/* <div className="flex-row margin-top-1">
              <a
                href="https://twitter.com/fansly"
                target="_blank"
                className="footer-item"
              >
                <i className="fab fa-square-twitter margin-right-2 font-size-xl"></i>
              </a>
              <a
                href="https://www.instagram.com/fansly/"
                target="_blank"
                className="footer-item"
              >
                <i className="fab fa-instagram font-size-xl"></i>
              </a>
            </div> */}
            <div className="language-select margin-top-1">
              {/* <app-xd-localization-select _nghost-ng-c611553075="">
                <div
                  _ngcontent-ng-c611553075=""
                  appxddropdown=""
                  className="transparent-dropdown"
                >
                  <div _ngcontent-ng-c611553075="">
                    <i
                      _ngcontent-ng-c611553075=""
                      className="fa-fw fal fa-globe margin-right-text"
                    ></i>
                    Language
                  </div>
                  <div
                    _ngcontent-ng-c611553075=""
                    className="dropdown-list top left"
                  ></div>
                </div>
              </app-xd-localization-select> */}
            </div>
          </div>
          <div className="sm-mobile-visible flex-row flex-2 flex-xs-col xs-mobile-flex-1">
            <div className="flex-1 flex-col margin-right-1 margin-left-1">
              <a
                href="https://help.fansly.com/"
                target="_blank"
                className="footer-item"
              >
                Help
              </a>
              <Link
                href="/explore"
                className="footer-item margin-top-1"
                tabIndex={0}
              >
                Explore
              </Link>
              <Link
                href="/tos"
                className="footer-item margin-top-1"
                tabIndex={0}
              >
                Terms of Service
              </Link>
              {/* <div
                data-routerlink="/dmca"
                className="footer-item margin-top-1"
                tabIndex={0}
              >
                DMCA
              </div> */}
            </div>
            <div className="margin-top-1"></div>
            <div className="flex-1 flex-col sm-mobile-visible margin-left-1">
              <div
                data-routerlink="/privacy"
                className="footer-item"
                tabIndex={0}
              >
                Privacy Policy
              </div>
              {/* <div
                data-routerlink="/usc2257"
                className="footer-item margin-top-1"
                tabIndex={0}
              >
                USC 2257
              </div> */}
              <Link
                href="/application"
                className="footer-item margin-top-1"
                tabIndex={0}
              >
                <LocalizationString>Become A Creator</LocalizationString>
              </Link>
            </div>
          </div>
          <div className="nav-left sm-mobile-hidden">
            <div className="nav-item"> © 2023 Fanclub </div>
            <div className="nav-item">
              {/* <app-xd-localization-select _nghost-ng-c611553075="">
                <div
                  _ngcontent-ng-c611553075=""
                  appxddropdown=""
                  className="transparent-dropdown"
                >
                  <div _ngcontent-ng-c611553075="">
                    <i
                      _ngcontent-ng-c611553075=""
                      className="fa-fw fal fa-globe margin-right-text"
                    ></i>
                    Language
                  </div>
                  <div
                    _ngcontent-ng-c611553075=""
                    className="dropdown-list top left"
                  ></div>
                </div>
              </app-xd-localization-select> */}
            </div>
            <div data-routerlink="/explore" className="nav-item" tabIndex={0}>
              <LocalizationString>Explore</LocalizationString>
            </div>
            {/* <div className="nav-item">
              <a href="https://twitter.com/fansly" target="_blank">
                <i className="fa-fw fab fa-twitter"></i> Twitter
              </a>
            </div>
            <div className="nav-item">
              <a href="https://www.instagram.com/fansly/" target="_blank">
                <i className="fa-fw fab fa-instagram"></i> Instagram
              </a>
            </div> */}
            <div data-routerlink="/terms" className="nav-item" tabIndex={0}>
              <LocalizationString>Terms</LocalizationString>
            </div>
            <div data-routerlink="/privacy" className="nav-item" tabIndex={0}>
              <LocalizationString>Privacy</LocalizationString>
            </div>
            {/* <div data-routerlink="/usc2257" className="nav-item" tabIndex={0}>
              USC 2257
            </div> */}
            {/* <div data-routerlink="/dmca" className="nav-item" tabIndex={0}>
              DMCA
            </div> */}
            <div
              data-routerlink="/application"
              className="nav-item"
              tabIndex={0}
            >
              <LocalizationString>Become A Creator</LocalizationString>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
