'use client'

import LocalizationString from '@/components/common/LocalizationString'
import FCButton from '@/components/common/button/FCButton'
import '@/styles/pages/password_reset_verify.scss'
import Link from 'next/link'
import { useState } from 'react'
import axios from 'axios'
import { toast} from 'react-toastify'

type Props = {
  children?: React.ReactNode
  className?: string
  token: string
  [x: string]: any
}

export default function FCPasswordResetVerifyRoute({
  children,
  className = '',
  token,
  ...rest
}: Props) {
  const [success, setSuccess] = useState(false)
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')

  const sendRequest = async () => {
    if (password1 !== password2) {
      toast.warning('Passwords do not match')
      return
    }
    const { data } = await axios.post('/api/password/resetverify', {
      code: token,
      new_password: password1,
    })
    if (data.success === 'success') {
      setSuccess(true)
    } else {
      toast.error('Your token is expired. Please resend your request.')
    }
  }

  return (
    <div className={`fc-password-reset-verify-route ${className}`} {...rest}>
      <div className="page-content">
        <div className="current-page-wrapper">
          <div className="current-page">
            <span>
              <LocalizationString>Forgot password</LocalizationString>
            </span>
          </div>
        </div>

        {!success && (
          <div className="flex-col">
            <div className="material-input margin-1 margin-top-2">
              <input
                type="password"
                required
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
                className="ng-untouched ng-pristine ng-invalid"
              />
              <div className="label">
                <LocalizationString>New Password </LocalizationString>
              </div>
              <div className="placeholder">
                <LocalizationString>Enter New Password</LocalizationString>
              </div>
            </div>
            <div className="material-input margin-1 margin-top-2">
              <input
                type="password"
                required
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                className="ng-untouched ng-pristine ng-invalid"
              />
              <div className="label">
                <LocalizationString>Confirm New Password</LocalizationString>
              </div>
              <div className="placeholder">
                <LocalizationString>
                  Enter New Password Again
                </LocalizationString>
              </div>
            </div>
            <FCButton
              className="btn solid-blue margin-top-2"
              onClick={sendRequest}
            >
              <LocalizationString>Change Password</LocalizationString>
            </FCButton>
          </div>
        )}

        {success && (
          <div className="flex-col flex-justify-center flex-align-center">
            <div className="blue-1">
              <i className="fa-fw fal fa-circle-check fa-3x"></i>
            </div>
            <div className="margin-top-2 dark-blue-1 bold">
              <LocalizationString className="margin-right-text">
                Password changed! Click{' '}
              </LocalizationString>
              <Link
                href="/"
                className="bold blue-1 pointer text-decoration-none"
                tabIndex={0}
              >
                <LocalizationString>here</LocalizationString>
              </Link>
              <LocalizationString> to go back. </LocalizationString>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
