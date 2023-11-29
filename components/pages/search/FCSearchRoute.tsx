'use client'

import LocalizationString from '@/components/common/LocalizationString'
import FCAccountAvatar from '@/components/common/account/FCAccountAvatar'
import FCAccountUsername from '@/components/common/account/FCAccountUsername'
import FCAccountFollowButton from '@/components/common/button/FCAccountFollowButton'
import { mockCreatorAccounts } from '@/mock/users'
import '@/styles/pages/search.scss'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function FCSearchRoute({
  children,
  className = '',
  ...rest
}: Props) {
  const [tabId, setTabId] = useState(0)
  const [query, setQuery] = useState('')

  const clearQuery = () => setQuery('')
  const router = useRouter()

  return (
    <div id="m_search_route" className={`${className}`} {...rest}>
      <div className="search-header-section">
        <div className="flex-0 margin-left-2 margin-right-2 pointer blue-1-hover-only">
          <i className="fa-fw fal fa-chevron-left"></i>
        </div>
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
            <LocalizationString>Search Fansly</LocalizationString>
          </div>
          <div className="placeholder">
            <LocalizationString>What are you looking for?</LocalizationString>
          </div>
        </div>
      </div>

      <div className="search-nav-section tab-nav-wrapper">
        <div className="tab-nav-items">
          <div
            className={classNames('tab-nav-item', { selected: tabId == 0 })}
            onClick={() => setTabId(0)}
          >
            <i className="fa-light fa-user"></i> Creators
          </div>
          <div
            className={classNames('tab-nav-item', { selected: tabId == 1 })}
            onClick={() => setTabId(1)}
          >
            <i className="fa-light fa-hashtag"></i> Tags
          </div>
        </div>
      </div>

      <div className="search-result-section">
        {tabId == 0 && (
          <div className="search-result-container">
            {mockCreatorAccounts.map((account, i) => (
              <div className="flex-row follower" key={i}>
                <div className="flex-0 margin-right-2">
                  <FCAccountAvatar
                    account={account}
                    hideOnlineIndicator={true}
                  />
                </div>
                <div className="flex-1 flex-col">
                  <div className="flex-row">
                    <div className="flex-1">
                      <FCAccountUsername
                        account={account}
                        maxLength={12}
                        showColumn={true}
                      />
                    </div>
                    <div className="flex-0">
                      <FCAccountFollowButton following={false} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tabId == 1 && (
          <div className="tag-suggestion-container">
            <div className="tags flex-col">
              {['glasses'].map((tag, i) => (
                <div
                  key={i}
                  className="tag-row flex-row flex-align-center"
                  onClick={() => router.push(`/explore/tag/${tag}`)}
                >
                  <div className="bubble custom">
                    <i className="fal fa-hashtag"></i>
                  </div>
                  <div className="flex-1 semi-bold"> {tag} </div>
                  <div className="flex-0 margin-right-2 dark-blue-1">
                    34.9K views
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
