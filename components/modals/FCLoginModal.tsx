'use client'

import '@/styles/modals/login.scss'
import LocalizationString from '../common/LocalizationString'
import FCButton from '../common/button/FCButton'
import DarkLogo from '@/public/logos/fansly_dark_v3.webp'
import LightLogo from '@/public/logos/fansly_light_v3.webp'
import Image from 'next/image'
import { useState } from 'react'
import { useModalMeta } from '@/contexts/modal'
import axios from 'axios'
import { toast } from 'react-toastify'

type Props = {
  children?: React.ReactNode
  className?: string
  data: number
  [x: string]: any
}

export default function FCLoginModal({
  children,
  className = '',
  data,
  ...rest
}: Props) {
  const { push, pop } = useModalMeta()
  const [showLogin, setShowLogin] = useState(data == 1)
  const toggleShow = () => setShowLogin(!showLogin)
  const showForgotModal = () => push({ id: 'forgotpassword', data: '' })

  const closeModal = () => pop()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const login = async () => {
    if (email === '' || password === '') {
      toast.warning('Please enter your email and password')
      return
    } else {
      const { data } = await axios.post('api/login', { email, password })
      if (data.success == 'success') {
        window.location.reload()
      } else {
        toast.error('Authentication failed')
      }
    }
  }

  const signup = async () => {
    if (
      email === '' ||
      password === '' ||
      confirmPassword === '' ||
      signupEmail === ''
    ) {
      toast.warning('Fill the required fields')
      return
    } else if (password != confirmPassword) {
      toast.warning('Confirm password is incorrect')
      return
    }
    const tid = toast.loading("Please wait...")

    try {
      const { data } = await axios.post('api/signup', {
        email,
        signupEmail,
        password,
      })
      if (data.success == 'success') {
        window.location.reload()
      } else if (data.success == 'exist') {
        toast.update(tid, { render: "Your account is already registered", isLoading: false, type: "error", autoClose: 2000 })
      } else {
        toast.update(tid, { render: "Sign up Failed", isLoading: false, type: "error", autoClose: 2000 })
      }
    } catch (e) {
      toast.update(tid, { render: "Sign up Failed", isLoading: false, type: "error", autoClose: 2000 })
    }
  }

  return (
    <div className={`fc-login-modal ${className}`} {...rest}>
      <div className="modal">
        <div className="modal-header">
          <div className="title flex-1"></div>
          <div className="actions" onClick={closeModal}>
            <i className="fa-fw fal fa-xmark pointer blue-1-hover-only"></i>
          </div>
        </div>
        <div className="modal-content">
          <div className="sign-up-introduction">
            <div className="logo">
              <Image src={DarkLogo} className="dark-theme-only" alt="" />
              <Image src={LightLogo} className="bright-theme-only" alt="" />
            </div>
          </div>
          <div className="login-form">
            <div className="user-name">
              <div className="material-input">
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="ng-untouched ng-pristine ng-invalid"
                />
                <div className="placeholder">
                  <LocalizationString>
                    {showLogin ? 'Enter username or email' : 'Enter username'}
                  </LocalizationString>
                </div>
                <div className="label">
                  <LocalizationString>
                    {showLogin ? 'Username or email' : 'Username'}
                  </LocalizationString>
                </div>
              </div>
            </div>

            {!showLogin && (
              <div className="e-mail">
                <div className="material-input">
                  <input
                    required
                    type="text"
                    className="ng-untouched ng-pristine ng-invalid"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                  />
                  <div className="placeholder">
                    <LocalizationString>Enter Email address</LocalizationString>
                  </div>
                  <div className="label">
                    <LocalizationString>Email address</LocalizationString>
                  </div>
                </div>
              </div>
            )}

            <div className="password">
              <div className="material-input">
                <input
                  type="password"
                  required
                  id="fansly_password"
                  className="ng-untouched ng-pristine ng-invalid"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="placeholder">
                  <LocalizationString>Enter password</LocalizationString>
                </div>
                <div className="label">
                  <LocalizationString>Password</LocalizationString>
                </div>
              </div>
            </div>

            {!showLogin && (
              <div className="password">
                <div className="material-input">
                  <input
                    type="password"
                    required
                    id="confirm_password"
                    className="ng-untouched ng-pristine ng-invalid"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <div className="placeholder">
                    <LocalizationString>
                      Enter password Again
                    </LocalizationString>
                  </div>
                  <div className="label">
                    <LocalizationString>Confirm Password</LocalizationString>
                  </div>
                </div>
              </div>
            )}
            {showLogin && (
              <div className="remember-forget noselect">
                <div className="forgot pointer" onClick={showForgotModal}>
                  <LocalizationString>Forgot password?</LocalizationString>
                </div>
              </div>
            )}
          </div>

          {!showLogin && (
            <div className="disclaimer">
              <LocalizationString className="margin-right-text">
                By joining, you agree to our{' '}
              </LocalizationString>
              <a href="/tos" target="_blank">
                <LocalizationString className="margin-right-text">
                  Terms &amp; Conditions{' '}
                </LocalizationString>
              </a>
              <LocalizationString className="margin-right-text">
                and{' '}
              </LocalizationString>
              <a href="/privacy" target="_blank">
                <LocalizationString>Privacy Policy</LocalizationString>
              </a>
              , and confirm that you are at least 18 years old.
            </div>
          )}

          {showLogin ? (
            <FCButton className="btn solid-blue large" onClick={login}>
              <LocalizationString>Sign in</LocalizationString>
            </FCButton>
          ) : (
            <FCButton className="btn solid-blue large" onClick={signup}>
              <LocalizationString>Join</LocalizationString>
            </FCButton>
          )}

          {showLogin ? (
            <div className="link noselect">
              <LocalizationString className="margin-right-text">
                Don&apos;t have an account?{' '}
              </LocalizationString>
              <span className="sign-up" onClick={toggleShow}>
                <LocalizationString>Sign up now</LocalizationString>
              </span>
            </div>
          ) : (
            <div className="link noselect">
              <LocalizationString className="margin-right-text">
                Already have an account?{' '}
              </LocalizationString>
              <span className="sign-up" onClick={toggleShow}>
                <LocalizationString>Login</LocalizationString>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
