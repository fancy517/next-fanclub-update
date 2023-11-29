import Link from 'next/link'
import FCMedia from '../feed/FCMedia'
import { TAccount } from '@/types/account'
import { TMedia } from '@/types/media'
import classNames from 'classnames'

type Props = {
  children?: React.ReactNode
  className?: string
  account: TAccount
  hideOnlineIndicator?: boolean
  statusMode?: number
  newAvatar?: File
  [x: string]: any
}

export default function FCAccountAvatar({
  children,
  className,
  account,
  hideOnlineIndicator = false,
  statusMode = 1,
  newAvatar,
  ...rest
}: Props) {
  // const showIndicator = account.availability != 'away' && !hideOnlineIndicator
  const showIndicator = !hideOnlineIndicator
  return (
    <div className={`fc-account-avatar ${className}`} {...rest}>
      <Link
        className={classNames(
          `status-mode-${statusMode}`,
          {
            'online-indicator': showIndicator,
          },
          `${account.availability} live-mode-1`,
        )}
        href={`/${account.userName}`}
      >
        {!account.avatarUrl ? (
          <div className="avatar default-avatar">
            <DefaultAvatarSVG />
          </div>
        ) : newAvatar === undefined ? (
          <FCMedia
            className="avatar"
            data={{
              id: "1",
              type: 'image',
              sourceid: account?.avatarUrl,
              timestamp: 123,
            }}
          />
        ) : (
          <div>
            <img
              className={`image over`}
              src={URL.createObjectURL(newAvatar)}
              style={{ objectFit: 'cover' }}
              width={80}
              height={80}
            />
          </div>
        )}
      </Link>
    </div>
  )
}

const DefaultAvatarSVG = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fal"
    data-icon="user"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    className="svg-inline--fa fa-user fa-w-14"
  >
    <g className="fa-group">
      <path
        fill="var(--dark-blue-1)"
        d="M352 128A128 128 0 1 1 224 0a128 128 0 0 1 128 128z"
        opacity="0.4"
        className="fa-secondary"
      ></path>
      <path
        fill="var(--dark-blue-1)"
        d="M313.6 288h-16.7a174.1 174.1 0 0 1-145.8 0h-16.7A134.43 134.43 0 0 0 0 422.4V464a48 48 0 0 0 48 48h352a48 48 0 0 0 48-48v-41.6A134.43 134.43 0 0 0 313.6 288z"
        className="fa-primary"
      ></path>
    </g>
  </svg>
)
