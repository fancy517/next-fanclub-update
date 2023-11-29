import { toast } from 'react-toastify'
import LocalizationString from '../LocalizationString'
import { useAuth } from '@/contexts/auth'

type Props = {
  children?: React.ReactNode
  className?: string
  cb?: (status: string) => void
  [x: string]: any
}

export default function FCOnlineStatusController({
  children,
  className,
  cb,
  ...rest
}: Props) {
  const { user } = useAuth()
  const onOnline = async () => {
    if (!user) return
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/user/setOnline?userid=${user.userID}`)
      const data = await response.json()
      if (data !== "success") {
        toast.error("Failed to set online status")
      } else {
        cb && cb("online")
      }
    } catch (err) {
      console.error(err)
    }
  }

  const onAway = async () => {
    if (!user) return
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/user/setAway?userid=${user.userID}`)
      const data = await response.json()
      if (data !== "success") {
        toast.error("Failed to set away status")
      } else {
        cb && cb("away")
      }
    } catch (err) {
      console.error(err)
    }
  }

  const onHidden = async () => {
    if (!user) return
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/user/setHidden?userid=${user.userID}`)
      const data = await response.json()
      if (data !== "success") {
        toast.error("Failed to set hidden status")
      } else {
        cb && cb("invisible")
      }
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <div className={`fc-online-status-controller ${className}`} {...rest}>
      <div className="status-wrapper" onClick={onOnline}>
        <div className="status-icon online">
          <i className="fa-fw fas fa-circle"></i>
        </div>
        <div className="status-text">
          <LocalizationString>Online</LocalizationString>
        </div>
      </div>
      <div className="status-wrapper" onClick={onAway}>
        <div className="status-icon away">
          <i className="fa-fw fas fa-circle"></i>
        </div>
        <div className="status-text">
          <LocalizationString>Away</LocalizationString>
        </div>
      </div>
      <div className="status-wrapper" onClick={onHidden}>
        <div className="status-icon offline" >
          <i className="fa-fw fas fa-circle"></i>
        </div>
        <div className="status-text">
          <LocalizationString>Hidden</LocalizationString>
        </div>
      </div>
    </div>
  )
}
