import '@/styles/modals/profile_edit.scss'
import LocalizationString from '../common/LocalizationString'
import FCAccountAvatar from '../common/account/FCAccountAvatar'
import { TAccount } from '@/types/account'
import { useRouter } from 'next/navigation'
import { useModalMeta } from '@/contexts/modal'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useAuth } from '@/contexts/auth'

type Props = {
  children?: React.ReactNode
  className?: string
  data: {
    account: TAccount
    cb: () => void
  }

  [x: string]: any
}

export default function FCProfileEditModal({
  children,
  className = '',
  data,
  ...rest
}: Props) {
  const { account, cb } = data
  const router = useRouter()
  const { pop } = useModalMeta()
  const { user } = useAuth()
  const [displayname, setDisplayName] = useState(account.displayName)
  const [location, setLocation] = useState(account.location)
  const [twitterurl, setTwitterUrl] = useState(account.twitterurl)
  const [instagramurl, setInstagramUrl] = useState(account.instagramurl)
  const [tiktokurl, setTiktokUrl] = useState(account.tiktokurl)
  const [aboutme, setAboutMe] = useState(account.aboutme)
  const [file_avatar, setFileAvatar] = useState<File>()
  const [file_banner, setFileBanner] = useState<File>()
  const fileEle1 = useRef<HTMLInputElement | null>(null)
  const fileEle2 = useRef<HTMLInputElement | null>(null)
  const [isEditable, setIsEditable] = useState(false)
  const onUploadBanner = () => {
    if (isEditable) {
      fileEle1.current?.click()
    }
  }
  const onUploadAvatar = () => {
    if (isEditable) {
      fileEle2.current?.click()
    }
  }

  const onClose = () => {
    pop()
  }
  const onSave = async () => {
    if (!isEditable) { return }
    try {
      var formData = new FormData()

      formData.append("username", account.userName)
      formData.append("displayname", displayname)
      formData.append("aboutme", aboutme || "")
      formData.append("twitter", twitterurl || "")
      formData.append("instagram", instagramurl || "")
      formData.append("tiktok", tiktokurl || "")
      formData.append("location", location || "")
      if (file_banner) {
        formData.append("files", file_banner)
        formData.append("banner", "true")
      }
      if (file_avatar) {
        formData.append("files", file_avatar)
        formData.append("avatar", "true")
      }
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/saveprofile`, {
        method: "POST",
        body: formData
      })
      const responseData = await response.json()
      console.log(responseData)
      if (responseData === "success") {
        toast.success("Your profile has been saved successfully")
        cb()
        pop()
      }
      else {
        toast.error("An error occurred during saving your profile")
      }
    } catch (err) {
      toast.error("An error occurred during saving your profile")
      console.log(err)
    }
  }
  useEffect(() => {
    if (user?.userName === account.userName) {
      setIsEditable(true)
    } else {
      setIsEditable(false)
    }
  }, [user])
  return (
    <div className={`fc-profile-edit-modal ${className}`} {...rest}>
      <div className="modal-header">
        <div className="modal-header-title">
          {isEditable ? (
            <LocalizationString>Edit Profile</LocalizationString>
          ) : (
            <LocalizationString>Profile Details</LocalizationString>
          )}
        </div>
        <i className="fa-fw fal fa-xmark blue-1-hover-only pointer hover-effect" onClick={() => pop()}></i>
      </div>
      <div className="modal-content">
        <div className="banner-container" style={{ background: file_banner ? `url(${URL.createObjectURL(file_banner)}) center/cover` : `url("${process.env.NEXT_PUBLIC_SERVER_URL}/public/${account.bannerUrl}") center/cover` }}>
          <div className="icon-wrapper"
            style={{ visibility: (isEditable ? "visible" : "hidden") }}
            onClick={onUploadBanner}
          >
            <i className="fa-fw fal fa-camera blue-1"></i>
          </div>
          <input
            multiple={false}
            ref={fileEle1}
            type="file"
            accept="image/png, image/jpeg, image/webp, image/gif"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setFileBanner(e.currentTarget.files ? e.currentTarget.files[0] : new File([], "xxx"))
            }}
            style={{ display: 'none' }}
          />
        </div>
        <div className="avatar-container">
          <FCAccountAvatar
            className="avatar"
            data-active-account={true}
            account={account}
            newAvatar={file_avatar}
          />
          <input
            multiple={false}
            ref={fileEle2}
            type="file"
            accept="image/png, image/jpeg, image/webp, image/gif"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFileAvatar(e.currentTarget.files ? e.currentTarget.files[0] : new File([], "xxx"))}
            style={{ display: 'none' }}
          />
          <div className="icon-wrapper blue-1-hover-only"
            style={{ visibility: (isEditable ? "visible" : "hidden") }}
            onClick={onUploadAvatar}
          >
            <i className="fa-fw fal fa-camera"></i>
          </div>
        </div>
        <div className="input-container flex-col">
          <div className="flex-row input-title">
            <LocalizationString>Display Name</LocalizationString>
          </div>
          <div className="flex-row">
            <div className="material-input width-100">
              <input
                type="text"
                value={displayname}
                onChange={(e) => setDisplayName(e.target.value)}
                required={true}
                className="ng-untouched ng-pristine ng-invalid"
                readOnly={!isEditable}
              />
              <div className="label">
                <LocalizationString>{isEditable ? "Enter Display Name" : ""}</LocalizationString>
              </div>
            </div>
          </div>
        </div>
        <div className="input-container flex-col">
          <div className="flex-row input-title">
            <LocalizationString>About</LocalizationString>
          </div>
          <div className="flex-row">
            <div className="material-input width-100">
              <textarea
                rows={4}
                required={true}
                value={aboutme}
                onChange={(e) => setAboutMe(e.target.value)}
                className="ng-untouched ng-pristine ng-valid"
                readOnly={!isEditable}
              ></textarea>
              {isEditable ? (
                <div className="label">
                  <LocalizationString>Type a description</LocalizationString>
                </div>
              ) : (<div></div>)}
            </div>
          </div>
        </div>
        <div className="input-container flex-col">
          <div className="flex-row input-title">
            <LocalizationString>Twitter</LocalizationString>
          </div>
          <div className="flex-row">
            <div className="material-input icon-left twitter width-100">
              <div className="icon-left highlight-icon">Twitter.com/</div>
              <input
                type="text"
                value={twitterurl}
                onChange={(e) => setTwitterUrl(e.target.value)}
                required={true}
                className="ng-untouched ng-dirty ng-invalid"
                readOnly={!isEditable}
              />
              <div className="label">
                <LocalizationString>{isEditable ? "Enter your account" : ""}</LocalizationString>
              </div>
            </div>
          </div>
        </div>
        <div className="input-container flex-col">
          <div className="flex-row input-title">
            <LocalizationString>Instagram</LocalizationString>
          </div>
          <div className="flex-row">
            <div className="material-input instagram icon-left width-100">
              <div className="icon-left highlight-icon"> Instagram.com/ </div>
              <input
                type="text"
                value={instagramurl}
                onChange={(e) => setInstagramUrl(e.target.value)}
                required={true}
                className="ng-untouched ng-pristine ng-invalid"
                readOnly={!isEditable}
              />
              <div className="label">
                <LocalizationString>{isEditable ? "Enter your account" : ""}</LocalizationString>
              </div>
            </div>
          </div>
        </div>
        <div className="input-container flex-col">
          <div className="flex-row input-title">
            <LocalizationString>TikTok</LocalizationString>
          </div>
          <div className="flex-row">
            <div className="material-input tiktok icon-left width-100">
              <div className="icon-left highlight-icon"> TikTok.com/@ </div>
              <input
                type="text"
                value={tiktokurl}
                onChange={(e) => setTiktokUrl(e.target.value)}
                required={true}
                readOnly={!isEditable}
                className="ng-untouched ng-pristine ng-invalid"
              />
              <div className="label">
                <LocalizationString>{isEditable ? "Enter your account" : ""}</LocalizationString>
              </div>
            </div>
          </div>
        </div>
        <div className="input-container flex-col">
          <div className="flex-row input-title">
            <LocalizationString>Location</LocalizationString>
          </div>
          <div className="flex-row">
            <div className="material-input width-100">
              <input
                value={location}
                type="text"
                required={true}
                className="ng-untouched ng-pristine ng-invalid"
                onChange={(e) => setLocation(e.target.value)}
                readOnly={!isEditable}
              />
              <div className="label">
                <LocalizationString>{isEditable ? "Enter your location" : ""}</LocalizationString>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isEditable && (
        <div className="modal-footer">
          <div className="btn large" onClick={onClose}>
            <LocalizationString>Cancel</LocalizationString>
          </div>
          <div className="btn solid-blue save-changes large" onClick={onSave}>
            <LocalizationString>Save</LocalizationString>
          </div>
        </div>
      )}
    </div>
  )
}
