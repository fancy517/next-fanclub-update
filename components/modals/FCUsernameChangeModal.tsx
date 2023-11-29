import { useModalMeta } from '@/contexts/modal'
import LocalizationString from '../common/LocalizationString'
import FCButton from '../common/button/FCButton'
import '@/styles/modals/username_change.scss'
import { useState } from 'react'
import { toast } from 'react-toastify'

type Props = {
  className?: string
  data: {
    username?: string,
    cb?: (status: string) => void
  }
}

export default function FCUsernameChangeModal({ className, data }: Props) {
  const { cb, username } = data
  const { pop } = useModalMeta()
  const [password, setPassword] = useState("")
  const [newusername, setNewUsername] = useState("")
  const [step, setStep] = useState(1)
  const changeUsername = async () => {
    try {
      if (password === "") { return }
      else if (newusername === "" || newusername === " ") { return }
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/change_username?username=${username}&password=${password}&newusername=${newusername}`)
      const responsedata = await response.json()
      if (responsedata === "success") {
        toast.success("Your username has been changed")
        cb && cb(newusername)
        setStep(2)
      } else if (responsedata === "exist") {
        toast.info("Your new username is already existing")
        return
      } else if (responsedata === "password") {
        toast.warning("Password is incorrect")
        return
      } else {
        toast.error("Error Occured")
      }
    } catch (err) {
      console.log(err)
      toast.error("Failed to change username")
    }
  }
  return (
    <div className={`fc-username-change-modal ${className ?? ''}`}>
      <div className="modal">
        <div className="modal-header">
          <div className="title">
            <LocalizationString>Change Username</LocalizationString>
          </div>
          <div
            className="actions flex-1 blue-1-hover-only pointer"
            onClick={() => pop()}
          >
            <i className="fa-fw fa fa-xmark"></i>
          </div>
        </div>
        {step === 1 ? (
          <div className="modal-content">
            <div className="dark-blue-1">
              <LocalizationString>
                Please enter your password and new username.
              </LocalizationString>
            </div>
            <div className="material-input margin-1 margin-top-2">
              <input
                type="password"
                required={true}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="ng-untouched ng-pristine ng-invalid"
              />
              <div className="placeholder">
                <LocalizationString>Enter Current Password</LocalizationString>
              </div>
              <div className="label">
                <LocalizationString>Current Password</LocalizationString>
              </div>
            </div>
            <div className="material-input margin-1">
              <input
                type="text"
                required={true}
                className="ng-untouched ng-pristine ng-invalid"
                value={newusername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
              <div className="placeholder">
                <LocalizationString>Enter New Username</LocalizationString>
              </div>
              <div className="label">
                <LocalizationString>New Username</LocalizationString>
              </div>
            </div>
          </div>
        ) : (
          <div className="modal-content ">
            <div className="dark-blue-1 flex-col flex-align-center">
              <div className="flex-row flex-justify-center margin-bottom-1">
                <i
                  className="fa-fw fal fa-circle-check fa-4x"
                  style={{ color: '#2699F7' }}
                ></i>
              </div>
              <div className="dark-blue-1 flex-row flex-align-center flex-wrap">
                <div className="margin-right-1">
                  <LocalizationString>
                    Your username has been changed!
                  </LocalizationString>
                </div>
              </div>
            </div>
          </div>
        )}
        {step === 1 ? (
          <div className="modal-footer">
            <FCButton className="btn solid-blue wider" onClick={changeUsername}>Change Username</FCButton>
          </div>
        ) : ("")}
      </div>
    </div>
  )
}
