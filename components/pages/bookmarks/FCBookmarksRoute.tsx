import LocalizationString from '@/components/common/LocalizationString'
import FCUserVault from '@/components/common/vault/FCUserVault'
import '@/styles/pages/bookmarks.scss'

type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function FCBookmarksRoute({
  children,
  className,
  ...rest
}: Props) {
  return (
    <div id="m_bookmarks_route" className={`${className ?? ''}`} {...rest}>
      <div className="page-content">
        <div className="current-page-wrapper">
          <div className="current-page">
            <span>
              <LocalizationString>Bookmarks / Collection</LocalizationString>
            </span>
          </div>
        </div>

        <FCUserVault />
      </div>
    </div>
  )
}
