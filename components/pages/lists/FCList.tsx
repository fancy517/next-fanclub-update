import LocalizationString from '@/components/common/LocalizationString'
import Dropdown from '@/components/common/dropdown'
import { useAuth } from '@/contexts/auth'
import { useModalMeta } from '@/contexts/modal'
import useOutsideClick from '@/hooks/useOutsideClick'
import { TList } from '@/types'
import { useRef, useState } from 'react'
import { toast } from 'react-toastify'

type Props = {
  children?: React.ReactNode
  className?: string
  data: TList
  selected?: boolean
  hideMenu?: boolean
  cb?: () => void
  [x: string]: any
}

const defaultListIds = ['blocked_accounts', 'muted_accounts', 'vip_accounts']

export default function FCList({
  children,
  className,
  selected,
  hideMenu = false,
  data: listData,
  cb,
  ...rest
}: Props) {
  const showactions = defaultListIds.findIndex((v) => v == listData.id) == -1
  const [open, setOpen] = useState(false)
  const button = useRef(null)
  const menu = useRef(null)
  const { user } = useAuth()
  useOutsideClick(button, menu, () => setOpen(false))

  const { push } = useModalMeta()

  const showEditModal = (e: React.MouseEvent) => {
    e.stopPropagation()
    push({ id: 'editlist', data: { cb: editList, list: listData } })
  }

  const editList = async (name: string) => {
    if (!user) return
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/user/edit_list?userid=${user.userID}&listid=${listData.id}&name=${name}`)
      const data = await response.json()
      if (data === "success") {
        cb && cb()
      } else {
        toast.error("Failed to edit")
      }
    } catch (err) {
      console.log(err)
    }
  }

  const deleteList = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!user) return
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/user/delete_list?userid=${user.userID}&listid=${listData.id}`)
      const data = await response.json()
      if (data === "success") {
        cb && cb()
      } else {
        toast.error("Failed to remove")
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={`fc-list ${className ?? ''}`} {...rest}>
      <div className="flex-row list flex-align-center">
        <div className="margin-right-2 checkbox">
          {selected === true && (
            <i className="fa-fw fal fa-square-check blue-1" />
          )}
          {selected === false && <i className="fa-fw fal fa-square blue-1"></i>}
        </div>
        <div className="flex-col flex-1">
          <div className="bold">{listData.name}</div>
          <div className="dark-blue-1">
            {listData.entries}{' '}
            <LocalizationString>Entries</LocalizationString>
          </div>
        </div>

        {/* Actions */}
        {showactions && !hideMenu && (
          <Dropdown className="actions transparent-dropdown" open={open}>
            <div
              className="dropdown-title font-size-xl"
              ref={button}
              onClick={(e) => {
                e.stopPropagation()
                setOpen(!open)
              }}
            >
              <i className="fa-fw fas fa-ellipsis hover-effect"></i>
            </div>
            <div className="dropdown-list" ref={menu}>
              <div className="dropdown-item" onClick={showEditModal}>
                <i className="fa-fw fal fa-pencil"></i>
                <LocalizationString>Edit List</LocalizationString>
              </div>
              <div className="dropdown-item" onClick={deleteList}>
                <i className="fa-fw fal fa-trash-can"></i>
                <LocalizationString>Delete List</LocalizationString>
              </div>
            </div>
          </Dropdown>
        )}
      </div>
    </div>
  )
}
