import LocalizationString from '@/components/common/LocalizationString'
import FCSuggestedAccount from '@/components/common/account/FCSuggestedAccount'
import { mockCreatorAccounts } from '@/mock/users'

type Props = {
  children?: React.ReactNode
  className?: string
  title?: string
  [x: string]: any
}

export default function FCSuggestionsSideBarNew({
  children,
  className,
  title = 'Suggestions',
  ...rest
}: Props) {
  return (
    <div className={`fc-suggestions-side-bar-new ${className ?? ''}`} {...rest}>
      <div className="feed-suggestions-wrapper">
        <div className="feed-suggestions">
          {/* begin suggestions header */}
          <div className="suggestions-header">
            <div className="flex-1 margin-left-text">
              <LocalizationString>{title}</LocalizationString>
            </div>
            <div className="actions dark-blue-1">
              <i className="fa-fw fal fa-chevron-left pointer blue-1-hover-only disabled"></i>
              <i className="fa-fw fal fa-chevron-right pointer blue-1-hover-only"></i>
            </div>
          </div>
          {/* end suggestions header */}

          <div className="feed-suggestion-wrapper">
            <div className="feed-suggestions-list noselect">
              <div className="flex-0" style={{ width: 0 }}></div>
              {[1, 2].map((v, i) => (
                <div className="feed-suggestions-list-page" key={i}>
                  {mockCreatorAccounts.map((account, i) => (
                    <FCSuggestedAccount
                      key={i}
                      className="feed-suggestion border-color"
                      account={account}
                    />
                  ))}
                </div>
              ))}
              <div className="flex-0" style={{ width: 0 }}></div>
            </div>
          </div>

          <div className="feed-suggestions-dots flex-row dark-blue-1 flex-justify-center padding-bottom-2 margin-top-2">
            <i className="fa-fw fas fa-circle blue-1 pointer"></i>
            <i className="fa-fw fal fa-circle blue-1-hover-only pointer"></i>
            <i className="fa-fw fas fa-arrow-right-long"></i>
          </div>
        </div>
      </div>
    </div>
  )
}
