import LocalizationString from '@/components/common/LocalizationString'
import FCButton from '@/components/common/button/FCButton'
import FCAccountEmail from '@/components/settings/FCAccountEmail'
import FCSettingsTextInput from '@/components/settings/FCSettingsTextInput'
import { useAuth } from '@/contexts/auth'
import { useModalMeta } from '@/contexts/modal'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function FCSettingsAccountRoute({
  children,
  className,
  ...rest
}: Props) {
  const { pop, push } = useModalMeta()
  const { user, signOut } = useAuth()
  const [username, setUsername] = useState(user?.userName || "")
  const [displayname, setDisplayName] = useState(user?.displayName || "")
  const [email, setEmail] = useState(user?.email || "")
  const [isEnabled, setIsEnabled] = useState(user?.otpEnabled || 0)
  const showChangeUsernameModal = () => push({
    id: 'usernamechange', data: {
      username: user?.userName, cb: (status: string) => {
        if (status !== "") {
          // setUsername(status)
          window.location.reload()
        }
      }
    }
  })

  useEffect(() => {
    setUsername(user?.userName || "")
    setDisplayName(user?.displayName || "")
    setEmail(user?.email || "")
    setIsEnabled(user?.otpEnabled || 0)
  }, [user])

  const ChangeDisplayname = async () => {
    try {
      const senddata = {
        userid: user?.userID || "",
        displayname: displayname
        // &userid=${user?.userID}&displayname=${displayname}
      }
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/change_displayname`, {
        method: 'POST',
        body: JSON.stringify(senddata)
      })
      const responsedata = await response.json()
      if (responsedata === "success") { window.location.reload() }
    } catch (err) {
      toast.error("Error Occured")
      console.log(err)
    }
  }




  const show2faModal = (status: number) => () => {
    push({
      id: 'setup2fa', data: {
        flag: status, cb: (status: string) => {
          if (status === "enabled") {
            toast.success("You have enabled 2FA")
            setIsEnabled(1)
          } else if (status === "disabled") {
            toast.success("Your 2FA is disabled")
            setIsEnabled(0)
          }
        }
      }
    })
  }
  const changePassword = () => {
    console.log("enabled:", isEnabled)
    if (isEnabled === 1) {
      push({
        id: '2fasessioncreate', data: {
          status: "change_password", cb: (status: string) => {
            if (status === "success") {
              toast.success("Your password has been updated")
              pop()
              // window.location.reload()
            }
          }
        }
      })
    }
    else {
      push({
        id: 'passwordchange', data: {
          cb: (status: string) => {
            if (status === "success") {
              toast.success("Your password has been updated successfully")
              pop()
            }
          }
        }
      })
    }
  }

  const [showDeleteAccountForm, setShowDeleteAccount] = useState(false)
  const toggleDeleteAccount = () => setShowDeleteAccount(!showDeleteAccountForm)

  const changeEmail = () => {
    // push({ id: 'emailchangenew', data: '' })
    if (isEnabled === 1) {
      push({
        id: '2fasessioncreate', data: {
          status: "change_email", cb: (status: string, data: string) => {
            if (status === "success") {
              setEmail(data)
              toast.success("Your email has been updated")
            }
          }
        }
      })
    }
    else {
      push({
        id: 'emailchangenew', data: {
          cb: (status: string, data: string) => {
            if (status === "success") {
              setEmail(data)
              toast.success("Your email has been updated successfully")
              pop()
            }
          }
        }
      })
    }
  }

  const deleteAccount = async () => {
    if (!user) return
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/delete_account?userid=${user.userID}`)
      const data = await response.json()
      if (data === "success") {
        signOut()
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={`fc-settings-account-route ${className ?? ''}`} {...rest}>
      <div className="flex-col">
        <div className="title bold">
          <LocalizationString>Username (Profile)</LocalizationString>
        </div>
        <div>
          fanclub.com/<span className="semi-bold">{username}</span>
        </div>
        <div
          className="btn wider outline-dark-blue margin-top-1 fixed-width"
          onClick={showChangeUsernameModal}
        >
          <LocalizationString>Change Username</LocalizationString>
        </div>
      </div>
      <div className="seperator border-bg-color"></div>
      <div className="flex-row">
        {/* <FCSettingsTextInput className="flex-col width-100" /> */}
        <div className={`fc-settings-text-input ${className ?? ''}`} {...rest}>
          <div className="flex-row">
            <div className="material-input">
              <input
                type="text"
                required={true}
                value={displayname}
                onChange={(e) => { setDisplayName(e.target.value) }}
                className="ng-untouched ng-pristine ng-invalid"
              />
              <div className="label">Display Name</div>
            </div>
            <FCButton className="change-button btn solid-blue wider margin-top-4" onClick={ChangeDisplayname} >
              <LocalizationString>Change</LocalizationString>
            </FCButton>
          </div>
        </div>
      </div>
      <div className="seperator border-bg-color"></div>
      <div className="flex-col">
        <div className="title bold">
          <LocalizationString>Email</LocalizationString>
        </div>
        <FCAccountEmail className="flex-row" email={email} />
        <div
          className="btn wider outline-dark-blue margin-top-1 fixed-width"
          onClick={changeEmail}
        >
          <LocalizationString>Change Email</LocalizationString>
        </div>
      </div>
      <div className="seperator border-bg-color"></div>
      <div className="flex-col">
        <div className="title bold">
          <LocalizationString>Manage 2FA</LocalizationString>
        </div>
        <div className="dark-blue-1">
          <LocalizationString>
            Protect your account and content by enabling 2FA. You can use apps
            such as Authy, Google Authenticator and many others to view your 2FA
            codes.
          </LocalizationString>
        </div>
        {isEnabled === 0 ? (
          <div
            className="btn wider outline-dark-blue margin-top-1"
            onClick={show2faModal(1)}
          >
            <LocalizationString>Setup 2FA Authentication</LocalizationString>
          </div>

        ) : (
          <div
            className="btn wider outline-dark-blue margin-top-1"
            onClick={show2faModal(2)}
          >
            <LocalizationString>Disable 2FA Authentication</LocalizationString>
          </div>
        )}
      </div>
      <div className="seperator border-bg-color"></div>
      <div className="flex-col">
        <div className="title bold">
          <LocalizationString>Password</LocalizationString>
        </div>
        <div
          className="btn wider outline-dark-blue margin-top-1 fixed-width"
          onClick={changePassword}
        >
          <LocalizationString>Change Password</LocalizationString>
        </div>
      </div>
      <div className="seperator border-bg-color"></div>
      <div className="flex-col">
        <div className="title bold">
          <LocalizationString>Account Status</LocalizationString>
        </div>
      </div>
      {showDeleteAccountForm ? (
        <div>
          <div className="red-1 bold">
            <LocalizationString _nghost-ng-c2905135316="">
              You are about to delete your account, this action is permanent.
              Please make sure you do not have any pending payouts as they may
              be interrupted. Do you want to proceed?
            </LocalizationString>
          </div>
          <div className="flex-row margin-top-1">
            <div
              className="btn wider fixed-width outline-dark-blue"
              onClick={toggleDeleteAccount}
            >
              <LocalizationString>Cancel</LocalizationString>
            </div>
            <div
              className="margin-left-2 btn solid-red wider"
              onClick={deleteAccount}
            >
              <LocalizationString>Yes, Delete Permanently</LocalizationString>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="btn outline-red wider margin-top-1 fixed-width"
          onClick={toggleDeleteAccount}
        >
          <LocalizationString>Delete Account</LocalizationString>
        </div>
      )}

      <div className="flex-row flex-col-mobile">
        <Link
          href="/application"
          className="btn outline-dark-blue wider margin-right-3 margin-top-1 fixed-width"
          style={{ color: 'inherit' }}
        >
          <LocalizationString>Model Application</LocalizationString>
        </Link>
      </div>
    </div>
  )
}
