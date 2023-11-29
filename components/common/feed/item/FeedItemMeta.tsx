'use client'

import LocalizationString from '../../LocalizationString'
import FCAccountUsername from '../../account/FCAccountUsername'
import { TAccount } from '@/types/account'
import Dropdown from '../../dropdown'
import { useRef, useState, useEffect } from 'react'
import useOutsideClick from '@/hooks/useOutsideClick'
import { useRouter } from 'next/navigation'
import { useModalMeta } from '@/contexts/modal'
import { copy2clipboard } from '@/utils/helpers'
import { toast } from 'react-toastify'
import { useAuth } from '@/contexts/auth'
import { TPost } from '@/types/media'

type Props = {
  children?: React.ReactNode
  className?: string
  account: TAccount,
  create_date: string,
  postid: string,
  postdata: TPost
  [x: string]: any
}

export default function FeedItemMeta({
  children,
  className,
  account,
  create_date,
  postid,
  postdata,
  ...rest
}: Props) {
  const [open, setOpen] = useState(false)
  const trigger = useRef(null)
  const list = useRef(null)
  useOutsideClick(trigger, list, () => setOpen(false))

  const router = useRouter()
  const { push } = useModalMeta()
  const subscribe = () => router.push(`/${account.userName}`)
  const follow = () => { }
  const unfollow = () => { }
  const add2list = () => push({ id: 'listaddaccount', data: {} })
  const report = () => push({ id: 'reportcontent', data: {} })
  const mute = () => { }
  const unmute = () => { }
  const block = () => { }
  const unblock = () => { }
  const vipuser = () => { }
  const unvipuser = () => { }
  const copyPostLink = () => {
    copy2clipboard(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/post/${postdata.id}`)
    toast.success('Post link has been copied to your clipboard.')
  }
  const { user } = useAuth()

  const [is_mine, setIsMine] = useState(false)

  useEffect(() => {
    setIsMine(account.userName === user?.userName ? true : false)
  }, [is_mine])

  const onEdit = () => {
    push({ id: 'postcreate', data: { edit: true, postdata: postdata } })
  }

  const onRemove = async () => {
    const senddata = {
      postid: postid,
      userid: String(user?.userID) || "0"
    }
    console.log(senddata)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/creator/removepost`, {
        method: "POST",
        body: JSON.stringify(senddata)
      })
      const responseData = await response.json()
      if (responseData === "success") {
        toast.success("Successfully removed post")
        const timer = setTimeout(() => {
          window.location.reload()
        }, 2000);
      }
      else
        toast.error("Error Occured")
    } catch (error) {
      toast.error("Server Error Occured")
      console.log(error)
    }
  }

  // const acceptFunc = async () => {

  // }

  const preventClick = (event: any) => {
    event.stopPropagation();
  }

  return (
    <div className={`feed-item-meta ${className ?? ''}`} {...rest}>
      <div className="feed-item-title">
        <div className="feed-item-name" onClick={preventClick}>
          <FCAccountUsername
            className="user-name sm-mobile-hidden"
            maxLength={18}
            showColumn={true}
            account={account}
          />
          <FCAccountUsername
            className="user-name sm-mobile-visible xs-mobile-hidden"
            maxLength={14}
            showColumn={true}
            account={account}
          />
          <FCAccountUsername
            className="user-name xs-mobile-visible"
            maxLength={12}
            showColumn={true}
            account={account}
          />
        </div>
        <div className="feed-item-timestamp">{create_date}</div>
        <Dropdown
          className="feed-item-actions dropdown-trigger more-dropdown"
          open={open}
          onClick={preventClick}
        >
          <div
            className="navigation-icon custom-hover-effect"
            ref={trigger}
            onClick={() => setOpen(!open)}
          >
            <i className="fa-fw fas fa-circle"></i>
            <i className="fa-fw fas fa-circle"></i>
            <i className="fa-fw fas fa-circle"></i>
          </div>
          {is_mine === false ? (
            <div className="dropdown-list" ref={list}>
              <div className="dropdown-item" onClick={add2list}>
                <i className="fa-fw fal fa-list"></i>
                <LocalizationString>Add To List</LocalizationString>
                <FCAccountUsername
                  className="margin-left-text nopointers"
                  maxLength={8}
                  account={account}
                  hideUsername={true}
                />
              </div>
              <div className="dropdown-item">
                <i className="fa-fw fal fa-xmark-octagon"></i>
                <LocalizationString>Unfollow</LocalizationString>
                <FCAccountUsername
                  className="margin-left-text nopointers"
                  maxLength={8}
                  account={account}
                  hideUsername={true}
                />
              </div>
              <div className="dropdown-item" onClick={subscribe}>
                <i className="fa-fw fal fa-user-tag"></i>
                <LocalizationString>Subscribe to</LocalizationString>
                <FCAccountUsername
                  className="margin-left-text nopointers"
                  maxLength={8}
                  account={account}
                  hideUsername={true}
                />
              </div>
              <div className="dropdown-item" onClick={copyPostLink}>
                <i className="fa-fw fal fa-arrow-right-from-bracket fa-rotate-270"></i>
                <LocalizationString>Copy post link</LocalizationString>
              </div>
              <div className="dropdown-item" onClick={report}>
                <i className="fa-fw fal fa-flag"></i>
                <LocalizationString>Report post</LocalizationString>
              </div>

              <div className="dropdown-item">
                <i className="fa-fw fal fa-user-check"></i>
                <LocalizationString>VIP</LocalizationString>
                <FCAccountUsername
                  className="margin-left-text nopointers"
                  maxLength={8}
                  account={account}
                  hideUsername={true}
                />
              </div>
              <div className="dropdown-item">
                <i className="fa-fw fal fa-user-xmark"></i>
                <LocalizationString>Mute</LocalizationString>
                <FCAccountUsername
                  className="margin-left-text nopointers"
                  maxLength={8}
                  account={account}
                  hideUsername={true}
                />
              </div>
              <div className="dropdown-item">
                <i className="fa-fw fal fa-ban"></i>
                <LocalizationString>Block</LocalizationString>
                <FCAccountUsername
                  className="margin-left-text nopointers"
                  maxLength={8}
                  account={account}
                  hideUsername={true}
                />
              </div>
            </div>

          ) : (
            <div className="dropdown-list" ref={list}>
              <div className="dropdown-item" onClick={onEdit}>
                <i className="fa-fw fal fa-edit"></i>
                <LocalizationString>Edit Post</LocalizationString>
              </div>
              <div className="dropdown-item" onClick={onRemove}>
                <i className="fa-fw fal fa-trash"></i>
                <LocalizationString>Remove Post</LocalizationString>
              </div>
            </div>
          )}
        </Dropdown>
      </div>
    </div>
  )
}
