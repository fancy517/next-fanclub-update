import { useState } from 'react'
import LocalizationString from '../common/LocalizationString'
import FCButton from '../common/button/FCButton'
import { useModalMeta } from '@/contexts/modal'
import { toast } from 'react-toastify'
import { useAuth } from '@/contexts/auth'

type Props = {
  children?: React.ReactNode
  className?: string
  data: {
    cb: (status: string, newemail: string) => void
  }
  [x: string]: any
}

export default function FCEmailChangeNewModal({
  children,
  className = '',
  data,
  ...rest
}: Props) {
  const { pop } = useModalMeta()
  const { cb } = data
  const [step, setStep] = useState(1)
  const [password, setPassword] = useState("")
  // const [verificationcode1, setVerificationCode1] = useState("")
  // const [verificationcode2, setVerificationCode2] = useState("")

  const [vcode1, setVCode1] = useState("")
  const [vcode2, setVCode2] = useState("")
  const [newemail, setNewEmail] = useState("")
  const { user } = useAuth()
  const next = async () => {
    if (step === 1) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/check_password?password=${password}&username=${user?.userName}`)
        const responsedata = await response.json()
        if (responsedata === "success") {
          setStep(step + 1)
          // setVerificationCode1(responsedata.vcode)
          return
        }
        else {
          toast.error("Password is incorrect")
          return
        }
      } catch (error) {
        console.log(error)
      }
    }
    else if (step === 2) {
      try {
        if (newemail === "" || newemail === " ") return
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/check_vcode1?vcode=${vcode1}&newemail=${newemail}&username=${user?.userName}`)
        const responsedata = await response.json()
        if (responsedata === "success") {
          setStep(step + 1)
          // setVerificationCode1(responsedata.vcode)
          return
        }
        else {
          toast.error("verification code is incorrect")
          return
        }
      } catch (error) {
        console.log(error)
      }
    }
    else if (step === 3) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/check_vcode2?vcode=${vcode2}&username=${user?.userName}&email=${newemail}`)
        const responsedata = await response.json()
        if (responsedata === "success") {
          cb && cb("success", newemail)
          setStep(step + 1)
          return
        }
        else {
          toast.error("Verification code is incorrect")
          return
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className={`fc-email-change-new-modal ${className}`} {...rest}>
      <div className="modal">
        <div className="modal-header">
          <div className="title">
            <LocalizationString>Change Email</LocalizationString>
            {step < 4 && `${step}/3`}
          </div>
          <div
            className="actions flex-1 blue-1-hover-only pointer"
            onClick={pop}
          >
            <i className="fa-fw fa fa-xmark"></i>
          </div>
        </div>
        <div className={`modal-content ${step != 1 && 'hidden'}`}>
          <div className="dark-blue-1">
            <LocalizationString>Please enter your password.</LocalizationString>
          </div>
          <div className="material-input margin-1 margin-top-2">
            <input
              type="password"
              required
              className="ng-dirty ng-valid ng-touched"
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
            />
            <div className="placeholder">
              <LocalizationString>Enter Current Password</LocalizationString>
            </div>
            <div className="label">
              <LocalizationString>Current Password</LocalizationString>
            </div>
          </div>
        </div>
        <div className={`modal-content ${step != 2 && 'hidden'}`}>
          <div className="dark-blue-1">
            <LocalizationString>
              We have sent you a verification email to your current email,
              please enter the code and your new email below.
            </LocalizationString>
          </div>
          <div className="material-input margin-1">
            <input
              type="text"
              placeholder="Enter Code"
              className="ng-valid ng-dirty ng-touched"
              value={vcode1}
              onChange={(e) => { setVCode1(e.target.value) }}
            />
            <div className="placeholder">
              <LocalizationString className="margin-right-text">
                Enter Code
              </LocalizationString>
            </div>
            <div className="label">
              <LocalizationString className="margin-right-text">
                Verification Code
              </LocalizationString>
            </div>
          </div>
          <div className="material-input margin-1">
            <input
              type="text"
              required
              className="ng-dirty ng-valid ng-touched"
              value={newemail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <div className="placeholder">
              <LocalizationString>Enter New Email</LocalizationString>
            </div>
            <div className="label">
              <LocalizationString>New Email</LocalizationString>
            </div>
          </div>
        </div>
        <div className={`modal-content ${step != 3 && 'hidden'}`}>
          <div className="dark-blue-1">
            <LocalizationString>
              We have sent you a verification email to your new email, please
              enter the code below.
            </LocalizationString>
          </div>
          <div className="material-input margin-1">
            <input
              type="text"
              placeholder="Enter Code"
              value={vcode2}
              onChange={(e) => setVCode2(e.target.value)}
              className="ng-valid ng-touched ng-dirty"
            />
            <div className="placeholder">
              <LocalizationString className="margin-right-text">
                Enter Code
              </LocalizationString>
            </div>
            <div className="label">
              <LocalizationString className="margin-right-text">
                Verification Code
              </LocalizationString>
            </div>
          </div>
        </div>
        <div className={`modal-content ${step != 4 && 'hidden'}`}>
          <div className="dark-blue-1 flex-col flex-align-center">
            <div className="flex-row flex-justify-center margin-bottom-1">
              <i
                className="fa-fw fal fa-circle-check fa-4x"
                style={{ color: 'var(--blue-1)' }}
              ></i>
            </div>
            <div className="dark-blue-1 flex-row flex-align-center flex-wrap">
              <div className="margin-right-1">
                <LocalizationString>
                  Your email has been changed!
                </LocalizationString>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-content hidden">
          <div className="dark-blue-1 flex-col flex-align-center">
            <div className="flex-row flex-justify-center margin-bottom-1">
              <i
                className="fa-fw fal fa-xmark fa-4x"
                style={{ color: 'var(--blue-1)' }}
              ></i>
            </div>
            <div className="dark-blue-1 flex-row flex-align-center flex-wrap">
              <div className="margin-right-1">
                <LocalizationString>
                  You entered too many wrong codes, please start over!
                </LocalizationString>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          {step < 4 && (
            <FCButton className="btn solid-blue wider" onClick={next}>
              <LocalizationString>Next</LocalizationString>
            </FCButton>
          )}
        </div>
      </div>
    </div>
  )
}
