import '@/styles/modals/new_message.scss'

import { mockCreatorAccounts } from '@/mock/users'
import LocalizationString from '../common/LocalizationString'
import FCAccountAvatar from '../common/account/FCAccountAvatar'
import FCAccountUsername from '../common/account/FCAccountUsername'
import { useModalMeta } from '@/contexts/modal'
import { useEffect, useState } from 'react'
import { TAccount } from '@/types/account'

type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function FCNewMessageModal({
  children,
  className = '',
  ...rest
}: Props) {
  const { pop } = useModalMeta()
  const [users, setUsers] = useState<TAccount[]>([])
  const [name, setName] = useState('')

  useEffect(() => {
    if (name == '') setUsers([])
    else setUsers(mockCreatorAccounts)
  }, [name])

  return (
    <div className={`fc-new-message-modal ${className}`} {...rest}>
      <div className="modal">
        <div className="modal-header">
          <div className="title">
            <LocalizationString>New Message</LocalizationString>
          </div>
          <div className="actions">
            <div onClick={pop}>
              <i className="fa-fw fa fa-xmark pointer blue-1-hover-only hover-effect"></i>
            </div>
          </div>
        </div>
        <div className="modal-content">
          <div className="dm-target">
            <div className="dm-target-search-container">
              <i className="fa-fw fal fa-magnifying-glass"></i>
              <input
                type="text"
                placeholder="Search users"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="ng-valid ng-dirty ng-touched"
              />
            </div>
          </div>
          <div className="search-results">
            {users.map((account, i) => (
              <div className="search-result" key={i}>
                <FCAccountAvatar className="avatar" account={account} />
                <FCAccountUsername className="alias" account={account} />
              </div>
            ))}
          </div>
          <div className="message-content-footer">
            <div className="input-footer">
              <div className="btn outline-dark-blue flex-row margin-right-1">
                <div className="icon-stack margin-right-text">
                  <i className="fa-fw fal fa-calendar"></i>
                  <i className="fa-fw fal fa-clock overlay bottom right"></i>
                </div>
                <LocalizationString>Scheduled</LocalizationString>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
