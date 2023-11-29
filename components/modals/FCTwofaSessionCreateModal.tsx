import '@/styles/modals/base.scss'
import LocalizationString from '../common/LocalizationString'
import FCButton from '../common/button/FCButton'
import { useModalMeta } from '@/contexts/modal'
import { useState } from 'react'
import { useAuth } from '@/contexts/auth'
import { toast } from 'react-toastify'
type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
  data: {
    status?: string
    cb?: (status: string, data: string) => void
  }
}

export default function FCTwofaSessionCreateModal({
  children,
  className,
  data,
  ...rest
}: Props) {
  const { pop, push } = useModalMeta()
  const [opt_token, setOptToken] = useState("")
  const { status, cb } = data
  const { user } = useAuth()
  const onVerify = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/otp_validate?username=${user?.userName}&otptoken=${opt_token}`)
      const responsedata = await response.json()
      if (responsedata === "success") {
        if (status === "change_password") {
          pop()
          push({
            id: 'passwordchange', data: {
              cb: (status: string) => {
                if (status === "success") {
                  cb && cb("success", "")
                  pop()
                }
              }
            }
          })
        }
        else if (status === "login") {
          pop()
          cb && cb("success", "")
        } else if (status === "change_email") {
          pop()
          push({
            id: 'emailchangenew', data: {
              cb: (status: string, newemail: string) => {
                if (status === "success") {
                  cb && cb("success", newemail)
                }
              }
            }
          })
        }
      } else {
        if (status === "change_password") {
          toast.error("2FA Code is incorrect")
        }
        else if (status === "login") {
          cb && cb("failed", "")
        }
      }
    } catch (err) {
      console.log(err)
    }

  }
  const onclose = () => {
    pop()
  }

  return (
    <div
      className={`fc-twofa-session-create-modal fc-modal-base ${className ?? ''
        }`}
      {...rest}
    >
      <div className="modal">
        <div className="modal-header">
          <div className="title"> 2FA Verification Required </div>
          <div className="actions" onClick={onclose}>
            <i className="fa-fw fa fa-xmark pointer blue-1-hover-only hover-effect"></i>
          </div>
        </div>
        <div className="modal-content">
          <div className="dark-blue-1 margin-top-1 margin-bottom-1">
            When 2FA is enabled, certain account actions require 2FA
            authentication for increased security.
          </div>
          <div className="material-input">
            <div className="user-name">
              <input
                // autocapitalize="none"
                // autocomplete="one-time-code"
                // autocorrect="off"
                // spellcheck="false"
                type="text"
                value={opt_token}
                onChange={(e) => setOptToken(e.target.value)}
                className="ng-untouched ng-pristine ng-valid"
              />
              <div className="label">
                <LocalizationString>Enter 2FA Code</LocalizationString>
              </div>
              <div className="placeholder">
                <LocalizationString>Enter 2FA Code</LocalizationString>
              </div>
            </div>
          </div>
          <div className="flex-row flex-justify-end margin-top-1">
            <FCButton
              className="btn solid-blue large margin-top-2"
              onClick={onVerify}
            >
              <LocalizationString>Verify</LocalizationString>
            </FCButton>
          </div>
        </div>
      </div>
    </div>
  )
}
