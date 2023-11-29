import '@/styles/modals/forgot-password.scss'
import LocalizationString from '../common/LocalizationString'
import FCButton from '../common/button/FCButton'
import { useState } from 'react'
import { useModalMeta } from '@/contexts/modal'
import axios from 'axios'
import { toast } from 'react-toastify'

type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function FCForgotPasswordModal({
  children,
  className = '',
  ...rest
}: Props) {
  const { pop } = useModalMeta()
  const [sent, setSent] = useState(false)
  const [email, setEmail] = useState('')

  const sendRequest = async () => {
    if (email == '') {
      return
    }

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/forgot-password`,
        { email },
      )

      if (data == 'success') {
        setSent(true)
      } else if (data == 'not_exist') {
        toast.info('Email does not exist')
      } else {
        toast.error('Error occured')
      }
    } catch (e) {
      toast.warning('Error occured')
      // console.log(e.error)
    }
  }

  const closeModal = () => pop()

  return (
    <div className={`fc-forgot-password-modal ${className}`} {...rest}>
      <div className="modal">
        <div className="modal-header">
          <div className="title flex-1"></div>
          <div className="actions" onClick={closeModal}>
            <i className="fa-fw fal fa-xmark blue-1-hover-only pointer"></i>
          </div>
        </div>
        <div className="modal-content">
          {!sent ? (
            <>
              <div className="forget-title">
                <LocalizationString>Password Reset</LocalizationString>
              </div>
              <div className="forget-description">
                <LocalizationString>
                  Enter your email address that you used to register. We&apos;ll
                  send you an email to reset your password
                </LocalizationString>
              </div>
              <div className="input-container">
                <div className="material-input">
                  <input
                    required
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="ng-untouched ng-pristine ng-invalid"
                  />
                  <div className="label">
                    <LocalizationString>Email address</LocalizationString>
                  </div>
                  <div className="placeholder">
                    <LocalizationString>Enter Email address</LocalizationString>
                  </div>
                </div>
              </div>
              <FCButton className="btn solid-blue large" onClick={sendRequest}>
                <LocalizationString>Send Reset Link</LocalizationString>
              </FCButton>
            </>
          ) : (
            <>
              <div className="forget-title">
                <LocalizationString>Request Successful</LocalizationString>
              </div>
              <div className="icon-container-wrapper">
                <div className="icon-container">
                  <i className="fa-fw fa fa-check"></i>
                </div>
              </div>
              <div className="forget-description">
                <LocalizationString>
                  If an account with the provided email is found, instructions
                  to reset the password will be sent.
                </LocalizationString>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
