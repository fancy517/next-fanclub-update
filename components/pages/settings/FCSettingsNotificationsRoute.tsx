import LocalizationString from '@/components/common/LocalizationString'
import XDSwitch from '@/components/common/xd/XDSwitch'
import { useAuth } from '@/contexts/auth'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function FCSettingsNotificationsRoute({
  children,
  className,
  ...rest
}: Props) {
  const { user } = useAuth()
  const [is_push, setIsPush] = useState(false)
  const [is_message, setIsMessage] = useState(false)
  const [is_reply, setIsReply] = useState(false)
  const [is_postlike, setIsPostLike] = useState(false)
  const [is_follower, setIsFollower] = useState(false)
  useEffect(() => {
    if (!user) return
    const fetchdata = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/get_notification_settings?userid=${user?.userID}`)
        const data = await response.json()
        setIsPush(data.is_push === 1 ? true : false)
        setIsMessage(data.is_message === 1 ? true : false)
        setIsReply(data.is_reply === 1 ? true : false)
        setIsPostLike(data.is_postlike === 1 ? true : false)
        setIsFollower(data.is_follower === 1 ? true : false)
      } catch (err) {
        toast.error("Fetch data failed")
        console.log(err)
      }

    }
    fetchdata()
  }, [user])

  const onUpdate = async () => {
    try {
      const senddata = {
        userid: user?.userID,
        is_push: is_push ? 1 : 0,
        is_message: is_message ? 1 : 0,
        is_reply: is_reply ? 1 : 0,
        is_postlike: is_postlike ? 1 : 0,
        is_follower: is_follower ? 1 : 0,
      }
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/update_notification_settings`, {
        method: "POST",
        body: JSON.stringify(senddata)
      })
      const data = await response.json()
      if (data === "success") {
        toast.success("Notification Setting is updated")
      }
      else {
        toast.error("Fetch data failed")
      }
    } catch (error) {
      toast.error("Fetch data filed")
      console.log(error)
    }
  }
  return (
    <div
      className={`fc-settings-notifications-route ${className ?? ''}`}
      {...rest}
    >
      <div className="bold flex-row flex-align-center margin-top-1">
        <LocalizationString>Push Notifications</LocalizationString>
        <div className="flex-0">
          <XDSwitch className="margin-left-1" value={is_push} onClick={() => { setIsPush(!is_push) }} />
        </div>
      </div>
      <div className="flex-row toggle-settings flex-align-center margin-top-1 margin-bottom-1">
        <div className="flex-1 bold dark-blue-1 font-size-sm">
          <LocalizationString>
            Enable Push Notifications to unlock settings.
          </LocalizationString>
        </div>
      </div>
      <div className="bold flex-row flex-align-center margin-top-1">
        <LocalizationString>Email Notifications </LocalizationString>
      </div>
      <div className="flex-row toggle-settings flex-align-center margin-top-1 margin-bottom-1">
        <div className="flex-1 bold dark-blue-1 font-size-sm">New Messages</div>
        <div className="flex-0">
          <XDSwitch className="margin-left-1" value={is_message} onClick={() => { setIsMessage(!is_message) }} />
        </div>
      </div>
      <div className="flex-row toggle-settings flex-align-center margin-top-1 margin-bottom-1">
        <div className="flex-1 bold dark-blue-1 font-size-sm">Post Replies</div>
        <div className="flex-0">
          <XDSwitch className="margin-left-1" value={is_reply} onClick={() => { setIsReply(!is_reply) }} />
        </div>
      </div>
      <div className="flex-row toggle-settings flex-align-center margin-top-1 margin-bottom-1">
        <div className="flex-1 bold dark-blue-1 font-size-sm"> Post Likes </div>
        <div className="flex-0">
          <XDSwitch className="margin-left-1" value={is_postlike} onClick={() => { setIsPostLike(!is_postlike) }} />
        </div>
      </div>
      <div className="flex-row toggle-settings flex-align-center margin-top-1 margin-bottom-1">
        <div className="flex-1 bold dark-blue-1 font-size-sm">
          New Followers
        </div>
        <div className="flex-0">
          <XDSwitch className="margin-left-1" value={is_follower} onClick={() => { setIsFollower(!is_follower) }} />
        </div>
      </div>
      {/* <div className="flex-row toggle-settings flex-align-center margin-top-1 margin-bottom-1">
        <div className="flex-1 bold dark-blue-1 font-size-sm">Stream Live</div>
        <div className="flex-0">
          <XDSwitch className="margin-left-1" />
        </div>
      </div> */}
      <div className="flex-row toggle-settings flex-align-center margin-top-3 margin-bottom-1">
        <div className='btn solid-blue' onClick={onUpdate}>
          <LocalizationString>Save changes</LocalizationString>
        </div>
      </div>
    </div>
  )
}
