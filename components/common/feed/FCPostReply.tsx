import { TAccount } from '@/types/account'
import FCAccountAvatar from '../account/FCAccountAvatar'
import FCAccountUsername from '../account/FCAccountUsername'
import LocalizationString from '../LocalizationString'
import { useModalMeta } from '@/contexts/modal'
import { copy2clipboard } from '@/utils/helpers'
import { toast } from 'react-toastify'

type Props = {
  children?: React.ReactNode
  className?: string
  account: TAccount
  [x: string]: any
}

export default function FCPostReply({
  children,
  className = '',
  account,
  ...rest
}: Props) {
  const { push } = useModalMeta()
  const showReplyModal = () => push({ id: 'postcreate', data: { reply: true } })

  const copyPostLink = () => {
    copy2clipboard('https://fans.ly/13216546')
    toast.success('Post link has been copied to your clipboard.')
  }

  return (
    <div className={`fc-post-reply ${className}`} {...rest}>
      <div className="feed-item-content border-color">
        <div className="flex-row width-100">
          <div className="flex-0 flex-col">
            <div className="feed-item-avatar flex-0">
              <FCAccountAvatar
                className="avatar"
                account={account}
                hideOnlineIndicator
              />
            </div>
            <div className="flex-1 flex-row flex-center">
              <div className="line-up"></div>
            </div>
          </div>
          <div className="flex-col flex-1">
            <div className="feed-item-meta">
              <div className="feed-item-title">
                <div className="feed-item-name">
                  <FCAccountUsername
                    className="user-name sm-mobile-hidden"
                    maxLength={14}
                    account={account}
                    showColumn
                  />
                  <FCAccountUsername
                    className="user-name sm-mobile-visible xs-mobile-hidden"
                    maxLength={10}
                    account={account}
                    showColumn
                  />
                  <FCAccountUsername
                    className="user-name xs-mobile-visible"
                    maxLength={8}
                    account={account}
                    showColumn
                  />
                </div>
                <div className="feed-item-timestamp"> Oct 28 </div>
                <div className="feed-item-actions dropdown-trigger more-dropdown">
                  <div className="navigation-icon custom-hover-effect">
                    <i className="fa-fw fas fa-circle"></i>
                    <i className="fa-fw fas fa-circle"></i>
                    <i className="fa-fw fas fa-circle"></i>
                  </div>
                  <div className="dropdown-list top right">
                    <div data-dropdown-value="xDD" className="dropdown-item">
                      <i className="fa-fw fal fa-list"></i>
                      <LocalizationString>Add To List</LocalizationString>({' '}
                      <FCAccountUsername
                        account={account}
                        maxLength={8}
                        className="margin-left-text nopointers"
                      />
                      )
                    </div>
                    <div className="dropdown-item">
                      <i className="fa-fw fal fa-user-check"></i>
                      <LocalizationString>Follow </LocalizationString>
                      <FCAccountUsername
                        account={account}
                        maxLength={8}
                        className="margin-left-text nopointers"
                      />
                    </div>
                    <div className="dropdown-item">
                      <i className="fa-fw fal fa-user-tag"></i>
                      <LocalizationString>Subscribe to</LocalizationString>
                      <FCAccountUsername
                        account={account}
                        maxLength={8}
                        className="margin-left-text nopointers"
                      />
                    </div>
                    <div className="dropdown-item" onClick={copyPostLink}>
                      <i className="fa-fw fal fa-arrow-right-from-bracket fa-rotate-270"></i>
                      <LocalizationString>Copy post link</LocalizationString>
                    </div>
                    <div className="dropdown-item">
                      <i className="fa-fw fal fa-flag"></i>
                      <LocalizationString>Report post </LocalizationString>
                    </div>

                    <div className="dropdown-item">
                      <i className="fa-fw fal fa-user-check"></i>
                      <LocalizationString>VIP </LocalizationString>
                      <FCAccountUsername
                        account={account}
                        maxLength={8}
                        className="margin-left-text nopointers"
                      />
                    </div>
                    <div className="dropdown-item">
                      <i className="fa-fw fal fa-user-xmark"></i>
                      <LocalizationString>Mute </LocalizationString>
                      <FCAccountUsername
                        account={account}
                        maxLength={8}
                        className="margin-left-text nopointers"
                      />
                    </div>
                    <div className="dropdown-item">
                      <i className="fa-fw fal fa-ban"></i>
                      <LocalizationString>Block </LocalizationString>
                      <FCAccountUsername
                        account={account}
                        maxLength={8}
                        className="margin-left-text nopointers"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="feed-item-description pre-wrap text-fansly-white">
                you are so breautiful
              </div>
            </div>
            <div className="feed-item-stats">
              <div className="feed-item-stat comments custom-hover-trigger">
                <div
                  className="icon-container custom-hover-effect"
                  onClick={showReplyModal}
                >
                  <i className="fa-fw fal fa-comment"></i>
                </div>{' '}
                0
              </div>
              <div className="feed-item-stat likes custom-hover-trigger">
                <div className="icon-container red custom-hover-effect">
                  <i className="fa-fw fal fa-heart"></i>
                </div>{' '}
                1
              </div>
              <div className="flex-1"></div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  )
}
