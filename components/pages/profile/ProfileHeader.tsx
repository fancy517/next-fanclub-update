import LocalizationString from '@/components/common/LocalizationString'
import FCAccountAvatar from '@/components/common/account/FCAccountAvatar'
import FCAccountBanner from '@/components/common/account/FCAccountBanner'
import FCAccountUsername from '@/components/common/account/FCAccountUsername'
import FCAccountFollowButton from '@/components/common/button/FCAccountFollowButton'
import Dropdown from '@/components/common/dropdown'
import { useAuth } from '@/contexts/auth'
import { useModalMeta } from '@/contexts/modal'
import useOutsideClick from '@/hooks/useOutsideClick'
import { TAccount } from '@/types/account'
import { TMedia } from '@/types/media'
import { copy2clipboard } from '@/utils/helpers'
import { useRef, useState, useEffect } from 'react'
import { toast } from 'react-toastify'

type Props = {
  account: TAccount
  [x: string]: any
  cb: () => void
}

export default function ProfileHeader({ account, cb, ...rest }: Props) {
  const [isMe, setIsMe] = useState(false)
  const { user } = useAuth()
  const { push } = useModalMeta()

  const [menuOpen, setMenuOpen] = useState(false)
  const dropdownListRef = useRef(null)
  const menuRef = useRef(null)
  const [cnt_image, SetImageCounts] = useState(0)
  const [cnt_video, SetVideoCounts] = useState(0)
  const [isFollow, setIsFollow] = useState(false)

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/getmediacounts?username=${account.userName}`)
        const responseData = await response.json()
        SetImageCounts(parseInt(responseData[0]))
        SetVideoCounts(parseInt(responseData[1]))
      } catch (err) {
        toast.error("error fetching data")
        console.log(err)
      }
    }
    fetchdata()
  }, [account])

  useEffect(() => {
    if (!(user && account)) return
    if (user?.userName === account.userName) {
      setIsMe(true)
    } else {
      setIsMe(false)
    }
    const fetchdata = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/user/getrelationship?userid=${user.userID}&followid=${account.userID}`)
        const data = await response.json()
        setIsFollow(data.following ? true : false)
      } catch (error) {
        toast.error("Server Error")
        console.log(error)
      }
    }
    fetchdata()
  }, [user, account])

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const tipUser = () => {
    push({ id: 'createtip', data: { account: account, tip_type: "USER" } })
  }
  useOutsideClick(menuRef, dropdownListRef, () => setMenuOpen(false))

  const showProfileModal = () => {
    push({
      id: 'editprofile',
      data: {
        account,
        cb: () => {
          cb()
        }
      },
    })
  }

  const showAvatarInModal = (e: MouseEvent) => {
    e.stopPropagation()
    // e.stopImmediatePropagation();
    e.preventDefault()
    console.log(e)
  }

  const showBannerInModal = () => {
    const media: TMedia = {
      id: account.userID || "0",
      type: 'image',
      sourceid: account.bannerUrl || "/images/banner1.jpg",
      timestamp: 0,
    }
    push({
      id: 'media',
      data: {
        media,
      },
    })
  }

  const addToList = () => { }
  const copyProfileLink = () => {
    copy2clipboard(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/` + user?.userName + `/post`)
    toast.success('Profile link has been copied to your clipboard.')
  }
  const reportUser = () => {
    try {

    } catch (err) {
      toast.error("Fetching Error: " + err)
      console.log(err)
    }
  }
  const muteUser = async () => {
    if (!user) return
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/user/mute_user?userid=${user?.userID}&creator=${account.userID}`)
      const data = await response.json()
      if (data === "add") {
        toast.success("Muted this creator")
      } else if (data === "remove") {
        toast.success("Unmuted this creator")
      } else {
        toast.error("Fetching Error")
      }
    } catch (err) {
      toast.error("Fetching Error: " + err)
      console.log(err)
    }
  }
  const blockUser = async () => {
    if (!user) return
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/user/block_user?userid=${user?.userID}&creator=${account.userID}`)
      const data = await response.json()
      if (data === "add") {
        toast.success("Blocked this creator")
      } else if (data === "remove") {
        toast.success("Unblocked this creator")
      } else {
        toast.error("Fetching Error")
      }
    } catch (err) {
      toast.error("Fetching Error: " + err)
      console.log(err)
    }
  }
  const vipUser = async () => {
    if (!user) return
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/user/vip_user?userid=${user?.userID}&creator=${account.userID}`)
      const data = await response.json()
      if (data === "add") {
        toast.success("Added this creator to VipUser")
      } else if (data === "remove") {
        toast.success("Removed this creator from VipUser")
      } else {
        toast.error("Fetching Error")
      }
    } catch (err) {
      toast.error("Fetching Error: " + err)
      console.log(err)
    }
  }
  const onFollow = async () => {
    if (!user) {
      toast.warning("Please sign in to follow")
      return
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/user/follow?userid=${user.userID}&followid=${account.userID}`)
      const data = await response.json()
      if (data === "add") {
        setIsFollow(true)
        toast.success("You started following this user")
      } else if (data === "remove") {
        setIsFollow(false)
        toast.success("You stopped following this user")
      } else {
        toast.error("Error Occured")
      }
    } catch (error) {
      toast.error("Error Occured")
      console.log("Fetch error: ", error)
    }
  }

  return (
    <div className="profile-header">
      <div className="profile-banner">
        <FCAccountBanner
          className="profile-banner-image"
          banner={account.bannerUrl || "/images/banner1.jpg"}
          onClick={showBannerInModal}
        />
      </div>
      <div className="profile-details">
        <div className="profile-image">
          <FCAccountAvatar
            className="avatar"
            account={account}
            statusMode={3}
            onClick={showAvatarInModal}
          />
        </div>
        <div className="flex-spacer"></div>

        {isMe ? (
          <>
            <div className="edit-profile">
              <div
                className="fllow-button new-style"
                onClick={showProfileModal}
              >
                <span>
                  <LocalizationString>Profile</LocalizationString>
                </span>
              </div>
            </div>

            <div
              className="tip-profile blue-1-hover-only new-style"
              onClick={copyProfileLink}
            >
              <i className="fa-fw fal fa-arrow-right-from-bracket fa-rotate-270"></i>
            </div>
          </>
        ) : (
          <>

            <div className="dm-profile dm-allowed new-style">
              <div className="dm-button">
                <i className="fa-fw fal fa-envelope"></i>
              </div>
            </div>
            <div className="tip-profile blue-1-hover-only new-style" onClick={tipUser}>
              <i className="fa-fw fal fa-dollar-sign"></i>
            </div>

            <Dropdown
              className="transparent-dropdown profile-more new-style"
              open={menuOpen}
            >
              <div
                className="dropdown-title blue-1-hover-only"
                ref={menuRef}
                onClick={toggleMenu}
              >
                <i className="fa-fw fal fa-ellipsis"></i>
              </div>
              <div className="dropdown-list" ref={dropdownListRef}>
                <div className="profile-dropdown-item" onClick={addToList}>
                  <i className="fa-fw fal fa-list"></i>
                  <LocalizationString>Add To List</LocalizationString>
                </div>
                <div
                  className="profile-dropdown-item"
                  onClick={copyProfileLink}
                >
                  <i className="fa-fw fal fa-arrow-right-from-bracket fa-rotate-270"></i>
                  <LocalizationString>Copy Profile Link</LocalizationString>
                </div>
                <div className="profile-dropdown-item" onClick={reportUser}>
                  <i className="fa-fw fal fa-flag"></i>
                  <LocalizationString>Report</LocalizationString>
                </div>
                <div className="profile-dropdown-item" onClick={vipUser}>
                  <i className="fa-fw fal fa-user-check"></i>
                  <LocalizationString>VIP user</LocalizationString>
                </div>
                <div className="profile-dropdown-item" onClick={muteUser}>
                  <i className="fa-fw fal fa-user-xmark"></i>
                  <LocalizationString>Mute user</LocalizationString>
                </div>

                <div className="profile-dropdown-item" onClick={blockUser}>
                  <i className="fa-fw fal fa-ban"></i>
                  <LocalizationString>Block user</LocalizationString>
                </div>
              </div>
            </Dropdown>
            <div className='follow-profile '>
              {/* <FCAccountFollowButton following={false} /> */}
              <div className={"red-1-hover-only fllow-button new-style"} onClick={onFollow}>
                <LocalizationString>{!isFollow ? "follow" : "following"} </LocalizationString>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="profile-details-2">
        <div className="profile-name">
          <FCAccountUsername
            className="user-name"
            account={account}
            showColumn={true}
            noInteraction={true}
          />
          <div className="active-status"></div>
        </div>
      </div>

      <div className="profile-stats">
        <div className="profile-stat">
          <div className="value">{account.likes}</div>
          <div className="title xs-mobile-hidden">
            <LocalizationString>Likes</LocalizationString>
          </div>
          <div className="title xs-mobile-visible">
            <i className="fa-fw fas fa-heart red-1"></i>
          </div>
        </div>
        <div className="profile-stat">
          <div className="value"> {account.followers} </div>
          <div className="title xs-mobile-hidden">
            <LocalizationString>Followers</LocalizationString>
          </div>
          <div className="title xs-mobile-visible">
            <i className="fa-fw fal fa-users blue-1"></i>
          </div>
        </div>
        <div className="profile-stat">
          <div className="value"> {cnt_image} </div>
          <div className="title xs-mobile-hidden"> Photos </div>
          <div className="title xs-mobile-visible">
            <i className="fa-fw fas fa-camera blue-1"></i>
          </div>
        </div>
        <div className="profile-stat">
          <div className="value"> {cnt_video} </div>
          <div className="title xs-mobile-hidden"> Videos </div>
          <div className="title xs-mobile-visible">
            <i className="fa-fw fas fa-video blue-1"></i>
          </div>
        </div>
        <div className="flex-spacer"></div>
      </div>
      <div className="mobile-next-row-wrapper"></div>
    </div>
  )
}
