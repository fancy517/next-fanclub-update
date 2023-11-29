import FCAccountAvatar from '@/components/common/account/FCAccountAvatar'
import FCAccountUsername from '@/components/common/account/FCAccountUsername'
import FCAccountFollowButton from '@/components/common/button/FCAccountFollowButton'
import { TAccount } from '@/types/account'

type Props = {
  children?: React.ReactNode
  className?: string
  account: TAccount
  [x: string]: any
}

export default function FCProfileFollowingRoute({
  children,
  className,
  account,
  ...rest
}: Props) {
  return (
    <div className={`fc-profile-following-route ${className ?? ''}`} {...rest}>
      {[1, 2].map((_, i) => (
        <div className="flex-row follower" key={i}>
          <div className="flex-0 margin-right-2">
            <FCAccountAvatar account={account} />
          </div>
          <div className="flex-1 flex-col">
            <div className="flex-row">
              <div className="flex-1">
                <FCAccountUsername
                  maxLength={12}
                  account={account}
                  showColumn={true}
                />
              </div>
              <div className="flex-0">
                <FCAccountFollowButton />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
