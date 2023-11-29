import LocalizationString from '@/components/common/LocalizationString'
import FCPermissionFlagsEditor from '@/components/common/editor/FCPermissionFlagsEditor'
import LogoDark from '/public/logos/fansly_dark_v3.webp'
import LogoLight from '/public/logos/fansly_light_v3.webp'
import Image from 'next/image'
import MultiToggleContainer from '@/components/common/editor/MultiToggleContainer'
import { useEffect, useState } from 'react'
import FCButton from '@/components/common/button/FCButton'
import { useAuth } from '@/contexts/auth'
import { TPermission, TPermissionArray } from '@/types/media'
import { toast } from 'react-toastify'

type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function FCSettingsPrivacyRoute({
  children,
  className,
  ...rest
}: Props) {
  const [sensitiveFilter, setSensitiveFilter] = useState(0)
  const [messageFilter, setMessageFilter] = useState(0)
  const [location, setLocation] = useState("")
  const [location_list, setLocationList] = useState<string[]>([])
  const [permissions, setPermissions] = useState<TPermissionArray[]>([])
  const { user } = useAuth()
  const addLocation = (t: string) => {
    t != '' && t != ' ' && !location_list.some((location_list) => location_list == t) && setLocationList([...location_list, t])
    setLocation('')
  }
  const removeLocation = (index: number) => () => {
    setLocationList(location_list.filter((_, i) => i != index))
  }

  const onSave = async () => {
    permissions[permissions.length - 1].length === 0 && permissions.pop()
    const senddata = {
      username: user?.userName,
      content: sensitiveFilter,
      locations: location_list,
      message: messageFilter,
      permissions: permissions
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/save_safety`, {
        method: "POST",
        body: JSON.stringify(senddata)
      })
      const responsedata = await response.json()
      if (responsedata === "success") {
        toast.success("Saved your settings")
      } else {
        toast.error("Failed to save your settings")
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/get_safety?username=${user?.userName}`)
        const responsedata = await response.json()
        setSensitiveFilter(responsedata.content_filter)
        const _blocked: string = responsedata.blocked_location
        const _blocked_list = _blocked.split(',')
        const _list = _blocked_list.filter(str => str.trim() !== '');
        setLocationList(_list)
        setMessageFilter(responsedata.message_filter)
        const _permissions: TPermissionArray[] = []
        const _perms = responsedata.permissions
        _perms.forEach((element: any) => {
          const _element: TPermission[] = []
          if (element.following != 0) _element.push("following")
          if (element.subscribed == "1") _element.push("subscribed")
          if (element.tipped != 0) _element.push(element.tipped)
          if (element.like != 0) _element.push("followed")
          _permissions.push(_element)
        });
        setPermissions(_permissions)
      } catch (error) {
        console.log(error)
      }

    }
    fetchdata()
  }, [user])

  return (
    <div className={`fc-settings-privacy-route ${className ?? ''}`} {...rest}>
      <div>
        <div className="bold margin-bottom-text">
          <LocalizationString>Sensitive Content Filter:</LocalizationString>
        </div>
        <div className="dark-blue-1 font-size-1">
          Configures the amount of blur on sensitive content when you browse
          Fansly. This only affects what you see and does not affect the content
          you upload.
        </div>
        <div className="dark-blue-1 margin-top-1 font-size-1">
          Enabling the sensitive content filter will also show less NSFW content
          in the FYP.
        </div>
        <div className="blur-preview margin-top-3 firefox-blur-1">
          <Image src={LogoDark} className="dark-theme-only" alt="" />
          <Image src={LogoLight} className="bright-theme-only" alt="" />
          {sensitiveFilter > 0 && (
            <div
              className={`blur-overlay flex-row flex-align-center flex-center blur-mode-${sensitiveFilter}`}
            >
              <i className="pure-white fa-fw fas fa-eye-slash fa-2x shadow"></i>
            </div>
          )}
        </div>

        <MultiToggleContainer
          className="margin-top-3"
          level={sensitiveFilter}
          onChange={(v) => setSensitiveFilter(v)}
        />

        <div className="bold margin-top-3">
          <LocalizationString>Add Blocked Location</LocalizationString>
        </div>
        <div className="font-size-sm dark-blue-1">
          <LocalizationString>
            You can block Countries, States or Cities from accessing your
            profile. Keep in mind that IP addresses are not always accurate to
            the city or state. It&apos;s up to you to find a balance between
            privacy and minimizing revenue loss.
          </LocalizationString>
        </div>
        <div className="flex-row flex-align-center margin-top-1">
          <div className="material-input">
            <input
              placeholder=""
              type="text"
              required={true}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={(e) => e.key == 'Enter' && addLocation(location)}
              className="margin-right-1"
            />
            <div className="label">
              <LocalizationString>Enter Blocked Location</LocalizationString>
            </div>
            <div className="placeholder">
              <LocalizationString>press enter to add location</LocalizationString>
            </div>
          </div>
        </div>
        <div className="bold margin-top-3">
          <LocalizationString>Your Blocked Locations</LocalizationString>
        </div>
        <div className="blocked-regions form-look">
          {location_list.length > 0 ? (
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {location_list.map((item, i) => (
                <div key={i} className="btn margin-right-3" onClick={removeLocation(i)}>
                  {item}
                </div>
              ))}
            </div>
          ) : (
            <div>
              <LocalizationString>
                You have no blocked locations.
              </LocalizationString>
            </div>

          )}
        </div>
        <div className="bold margin-bottom-text margin-top-3">
          <LocalizationString>Timeline Permissions</LocalizationString>
        </div>
        <div className="dark-blue-1 font-size-sm margin-bottom-1">
          Learn more about permissions on Fanclub
          <a
            target="_blank"
            rel="noopener noreferrer nofollow"
            href="https://help.fanclub.com/hc/en-us/articles/15448136045971-Media-Permissions"
          >
            here
          </a>
          .
        </div>
        <div className="dark-blue-1 margin-bottom-1">
          <LocalizationString>
            For a user to be able to see my posts and timeline they must be:
          </LocalizationString>
        </div>

        <FCPermissionFlagsEditor className="margin-top-3" data={{
          _permission: permissions, cb: (cb: TPermissionArray[]) => {
            cb.length && setPermissions(cb)
          }
        }} />

        <div className="bold margin-bottom-text margin-top-3">
          <LocalizationString>Message Content Blur: </LocalizationString>
        </div>
        <div className="dark-blue-1 font-size-1">
          Configures the amount of blur on media in direct messages.
        </div>
        <div className="blur-preview margin-top-3 firefox-blur-3">
          <Image src={LogoDark} className="dark-theme-only" alt="" />
          <Image src={LogoDark} className="bright-theme-only" alt="" />
          {messageFilter > 0 && (
            <div className={`blur-overlay blur-mode-${messageFilter}`}></div>
          )}
        </div>
        <MultiToggleContainer
          className="margin-top-3"
          level={messageFilter}
          onChange={(v) => setMessageFilter(v)}
        />
        <div style={{ width: "10em", height: "5em" }}>
          <FCButton className="btn solid-blue wider" onClick={onSave}>
            <LocalizationString>Save settings</LocalizationString>
          </FCButton>
        </div>
      </div>
    </div>
  )
}
