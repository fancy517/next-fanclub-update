'use client'

import '@/styles/pages/verification.scss'
import LocalizationString from '@/components/common/LocalizationString'
import FCButton from '@/components/common/button/FCButton'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useState } from 'react'
import { redirect } from 'next/navigation'

type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function FCUserVerificationCode({
  children,
  className = '',
  res,
  ...rest
}: Props) {
  const [vcode, setVcode] = useState('')

  const resendVerficationCode = async () => {
    try {
      const { data } = await axios.post('/api/auth/resend-verification-code')
      if (data.success === 'failed')
        toast.error('You have been logged out. Please sign in again')
      else if (data.success === 'success')
        toast.success('Verification code has been sent to your email')
    } catch (error) {
      toast.error('Connection Error. Please try again later')
      console.log(error)
    }
  }

  const confirmVerficationCode = async () => {
    try {
      const { data } = await axios.post('/api/auth/confirm-verification-code', {
        vcode,
      })
      if (data.success === 'failed')
        toast.error(
          'You have been logged out or your verification code is invalid. Please try again later',
        )
      else if (data.success === 'success') {
        window.location.href = '/'
      }
    } catch (error) {
      toast.error('Connection Error. Please try again later')
      console.log(error)
    }
  }
  if (res === 'success') {
    return (
      <div className="verification-container">
        <div className="verification-content">
          <div className="verification-title">
            <LocalizationString>Success!</LocalizationString>
          </div>
          <div className="verification-text">
            <LocalizationString>
              Your account has been verifed.
            </LocalizationString>
          </div>
        </div>
        <div className="verification-button">
          <FCButton
            onClick={() => redirect('/')}
            className="btn outline-blue large"
          >
            <LocalizationString>Go</LocalizationString>
          </FCButton>
        </div>
      </div>
    )
  } else {
    return (
      <div className={`fc-verification-page ${className}`} {...rest}>
        <div className="email-sending-part">
          <LocalizationString>
            We have sent the verification code to your email.
            <br />
            Haven't you received the verification code?
          </LocalizationString>
          <span className="resend-code-span" onClick={resendVerficationCode}>
            resend
          </span>
        </div>
        <div className="verification-input-part">
          <input
            type="text"
            required
            name="verfication-code"
            value={vcode}
            onChange={(e) => setVcode(e.target.value)}
          />
          <FCButton
            className="btn outline-blue large"
            onClick={confirmVerficationCode}
          >
            <LocalizationString>Confirm</LocalizationString>
          </FCButton>
        </div>
      </div>
    )
  }
}
