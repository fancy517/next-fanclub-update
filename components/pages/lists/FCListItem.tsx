import LocalizationString from '@/components/common/LocalizationString'
import FCAccountAvatar from '@/components/common/account/FCAccountAvatar'
import FCAccountUsername from '@/components/common/account/FCAccountUsername'
import { useAuth } from '@/contexts/auth'
import { TAccount } from '@/types/account'
import { TSimpleAccount } from '@/types/payment'
import { toast } from 'react-toastify'

type Props = {
  children?: React.ReactNode
  className?: string
  account: TSimpleAccount
  listid: string
  cb?: () => void
  [x: string]: any
}

export default function FCListItem({
  children,
  className,
  account,
  listid,
  cb,
  ...rest
}: Props) {
  const { user } = useAuth()
  const _account: TAccount = {
    displayName: account.displayname,
    userName: account.username,
    availability: "online",
    avatarUrl: account.avatar,
  }
  const onRemove = async () => {
    if (!user) return
    console.log("listid", listid)
    let url = ""
    if (listid === "muted_accounts") {
      url = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/user/mute_user?userid=${user.userID}&creator=${account.id}`
    } else if (listid === "blocked_accounts") {
      url = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/user/block_user?userid=${user.userID}&creator=${account.id}`

    } else if (listid === "vip_accounts") {
      url = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/user/vip_user?userid=${user.userID}&creator=${account.id}`
    } else {
      url = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/user/custom_user?userid=${user.userID}&creator=${account.id}&listid=${listid}`
    }
    try {
      const response = await fetch(url)
      const data = await response.json()
      if (data === "remove") {
        toast.success("Removed from the list")
        cb && cb()
      } else {
        toast.error("Fetch Error")
      }
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div className={`fc-list-item ${className ?? ''}`} {...rest}>
      <div className="flex-row follower flex-align-center">
        <div className="flex-0 margin-right-2">
          <FCAccountAvatar account={_account} hideOnlineIndicator={true} />
        </div>
        <div className="flex-1 flex-col">
          <div className="flex-row flex-align-center">
            <div className="flex-0">
              <FCAccountUsername
                maxLength={12}
                account={_account}
                noInteraction={true}
                showColumn={true}
              />
            </div>
            <div className="flex-1"></div>
            <div className="flex-0">
              <div className="btn outline-red" onClick={onRemove}>
                <i className="margin-right-text"></i>
                <LocalizationString>Remove</LocalizationString>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
