import '@/styles/modals/password_change.scss'
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
    cb: (status: string) => void
  }
}

export default function FCPasswordChangeModal({
  children,
  className,
  data,
  ...rest
}: Props) {
  const { pop } = useModalMeta()
  const { cb } = data
  const [oldpassword, setOldPassowrd] = useState("")
  const [newpassword1, setNewPassword1] = useState("")
  const [newpassword2, setNewPassword2] = useState("")
  const { user } = useAuth()
  const onPasswordChange = async () => {
    if (oldpassword === "" || oldpassword === " ") {
      toast.info("Please enter current password")
      return
    }
    if (newpassword1 !== newpassword2) {
      toast.info("Confirm password is incorrect")
      return
    }
    if (newpassword1.length < 4) {
      toast.info("Please set the password at least 4 lengths.")
      return
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/change_password?username=${user?.userName}&oldpassword=${oldpassword}&newpassword=${newpassword1}`)
      const responsedata = await response.json()
      if (responsedata === "password") {
        toast.error("Current password is incorrect")
      } else if (responsedata === "success") {
        cb && cb("success")
        pop()
      } else {
        toast.error("Error Occured")
      }
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div className={`fc-password-change-modal ${className ?? ''}`} {...rest}>
      <div className="modal">
        <div className="modal-header">
          <div className="title">
            <LocalizationString>Change Password</LocalizationString>
          </div>
          <div
            className="actions flex-1 blue-1-hover-only pointer"
            onClick={pop}
          >
            <i className="fa-fw fa fa-xmark hover-effect"></i>
          </div>
        </div>
        <div className="modal-content">
          <div className="dark-blue-1">
            <LocalizationString>
              If you forgot your password, you can request a new password by
              logging out and following the steps for &apos;forgot
              password&apos;.
            </LocalizationString>
          </div>
          <div className="material-input margin-1 margin-top-2">
            <input
              type="password"
              required={true}
              value={oldpassword}
              onChange={(e) => setOldPassowrd(e.target.value)}
              className="ng-untouched ng-pristine ng-invalid"
            />
            <div className="label">
              <LocalizationString>Current Password</LocalizationString>
            </div>
            <div className="placeholder">
              <LocalizationString>Enter Current Password</LocalizationString>
            </div>
          </div>
          <div className="material-input margin-1 margin-top-2">
            <input
              type="password"
              required={true}
              value={newpassword1}
              onChange={(e) => setNewPassword1(e.target.value)}
              className="ng-untouched ng-pristine ng-invalid"
            />
            <div className="label">
              <LocalizationString>New Password</LocalizationString>
            </div>
            <div className="placeholder">
              <LocalizationString>Enter New Password</LocalizationString>
            </div>
          </div>

          {false && (
            <div className="flex-col password-requirements">
              <div className="password-requirement">
                <i className="fa-fw fas fa-xmark-circle"></i>
                <i className="fa-fw fas fa-circle-check"></i>
                <LocalizationString>
                  Must be atleast 6 characters
                </LocalizationString>
              </div>
              <div className="password-requirement-description">
                <LocalizationString>
                  Meet atleast 3 of the 4 requirements below
                </LocalizationString>
              </div>
              <div className="password-requirement success">
                <i className="fa-fw fas fa-xmark-circle"></i>
                <i className="fa-fw fas fa-circle-check"></i>
                <LocalizationString>
                  Contains a lower case character
                </LocalizationString>
              </div>
              <div className="password-requirement success">
                <i className="fa-fw fas fa-xmark-circle"></i>
                <i className="fa-fw fas fa-circle-check"></i>
                <LocalizationString>
                  Contains a Upper case character
                </LocalizationString>
              </div>
              <div className="password-requirement">
                <i className="fa-fw fas fa-xmark-circle"></i>
                <i className="fa-fw fas fa-circle-check"></i>
                <LocalizationString>Contains a Number</LocalizationString>
              </div>
              <div className="password-requirement success">
                <i className="fa-fw fas fa-xmark-circle"></i>
                <i className="fa-fw fas fa-circle-check"></i>
                <LocalizationString>
                  Contains a Special Character (!, @, #, etc.)
                </LocalizationString>
              </div>
            </div>
          )}
          <div className="material-input margin-1 margin-top-2">
            <input
              type="password"
              required={true}
              value={newpassword2}
              onChange={(e) => setNewPassword2(e.target.value)}
              className="ng-untouched ng-pristine ng-invalid"
            />
            <div className="label">
              <LocalizationString>Confirm New Password</LocalizationString>
            </div>
            <div className="placeholder">
              <LocalizationString>Enter New Password Again</LocalizationString>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <FCButton className="btn solid-blue wider" onClick={onPasswordChange}>
            <LocalizationString>Change Password</LocalizationString>
          </FCButton>
        </div>
      </div>
    </div>
  )
}
