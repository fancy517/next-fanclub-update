import LocalizationString from '@/components/common/LocalizationString'
import FCAccountAvatar from '@/components/common/account/FCAccountAvatar'
import FCAccountUsername from '@/components/common/account/FCAccountUsername'
import Dropdown from '@/components/common/dropdown'
import useOutsideClick from '@/hooks/useOutsideClick'
import { mockCreatorAccounts } from '@/mock/users'
import { TAccount } from '@/types/account'
import { useRef, useState } from 'react'
import FCButtonNew from '@/components/common/button/FCButtonNew'
import { useRouter } from 'next/navigation'

type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function AdminUsers({
  children,
  className = '',
  ...rest
}: Props) {
  const [query, setQuery] = useState('')
  const clearQuery = () => setQuery('')

  return (
    <div className={`${className}`} {...rest}>
      <div>
        <div className="flex-1 material-input icon-left icon-right margin-right-2">
          <input
            type="text"
            required={true}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="ng-untouched ng-pristine ng-invalid"
          />
          <div className="icon-left highlight-icon">
            <i className="fa-fw fal fa-magnifying-glass"></i>
          </div>
          <div className="icon-right highlight-icon">
            {query.length > 0 && (
              <i className="fa-fw fal fa-xmark" onClick={clearQuery}></i>
            )}
          </div>
          <div className="label">
            <LocalizationString>Search Users</LocalizationString>
          </div>
          <div className="placeholder">
            <LocalizationString>What are you looking for?</LocalizationString>
          </div>
        </div>

        <div className="flex-col margin-top-3">
          {mockCreatorAccounts.map((account, i) => (
            <AdminUserItem account={account} key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}

const AdminUserItem = ({ account }: { account: TAccount }) => {
  const [open, setOpen] = useState(false)
  const button = useRef(null)
  const menu = useRef(null)
  const toggleOpen = () => setOpen(!open)
  useOutsideClick(button, menu, () => setOpen(false))

  const router = useRouter()
  const showPosts = () => router.push(`/admin/posts/${account.userName}`)
  const showMedias = () => router.push(`/admin/medias/${account.userName}`)

  return (
    <div className="flex-row admin-user-item flex-align-center">
      <div className="margin-right-3">
        <FCAccountAvatar account={account} />
      </div>
      <div>
        <FCAccountUsername account={account} showColumn={true} />
      </div>
      <div className="flex-1"></div>
      <Dropdown className="actions transparent-dropdown" open={open}>
        <div
          className="dropdown-title font-size-xl"
          ref={button}
          onClick={toggleOpen}
        >
          <i className="fa-fw fas fa-ellipsis hover-effect"></i>
        </div>
        <div className="dropdown-list" ref={menu}>
          <div className="dropdown-item" onClick={showPosts}>
            <i className="fa-fw fal fa-images"></i>
            <LocalizationString>Show Posts</LocalizationString>
          </div>
          <div className="dropdown-item" onClick={showMedias}>
            <i className="fa-fw fal fa-photo-video"></i>
            <LocalizationString>Show Medias</LocalizationString>
          </div>
          <FCButtonNew
            buttonContent={
              <div className="dropdown-item">
                <i className="fa-fw fal fa-ban" />
                <LocalizationString>Block this user</LocalizationString>
              </div>
            }
            confirmationContent={
              <div className="flex-row margin-top-1">
                Do you want to block @{account.userName}?
              </div>
            }
            cb={() => {}}
          />
        </div>
      </Dropdown>
    </div>
  )
}
