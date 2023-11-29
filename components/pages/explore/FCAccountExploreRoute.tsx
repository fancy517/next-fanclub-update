'use client'

import LocalizationString from '@/components/common/LocalizationString'
import FCSuggestedMediaOfferSuggestionTags from './FCSuggestedMediaOfferSuggestionTags'
import FCMediaOfferSuggestionsTimelinePost from '@/components/common/feed/FCMediaOfferSuggestionsTimelinePost'
import FCSuggestionsSideBarNew from '../feed/FCSuggestionsSideBarNew'
import { useState } from 'react'
import FCAccountAvatar from '@/components/common/account/FCAccountAvatar'
import FCAccountUsername from '@/components/common/account/FCAccountUsername'
import FCAccountFollowButton from '@/components/common/button/FCAccountFollowButton'
import { mockCreatorAccounts } from '@/mock/users'
import { mockTags } from '@/mock/tags'
import Link from 'next/link'

type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function FCAccountExploreRoute({
  children,
  className = '',
  ...rest
}: Props) {
  const [query, setQuery] = useState('')

  const clearQuery = () => setQuery('')

  return (
    <div className={`fc-account-explore-route ${className}`} {...rest}>
      <div className="material-input icon-left icon-right">
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

      {query == '' ? (
        <>
          <FCSuggestedMediaOfferSuggestionTags
            className="margin-top-1"
            tags={mockTags}
          />
          <FCMediaOfferSuggestionsTimelinePost />
          <FCSuggestionsSideBarNew
            className="feed-item"
            title="Who To Follow"
          />
        </>
      ) : (
        <>
          <div className="tag-suggestion-container margin-top-4">
            <div className="semi-bold flex-row flex-align-center pointer">
              Discover <div className="flex-1"></div>
            </div>
            <div className="tags flex-row flex-wrap margin-top-2">
              {mockTags.map((tag) => (
                <Link
                  href={`/explore/tag/${tag}`}
                  className="bubble text-decoration-none"
                  style={{ color: 'inherit' }}
                  key={tag}
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
          <div className="semi-bold flex-row flex-align-center title-container pointer">
            Creators <div className="flex-1"></div>
          </div>

          <div className="search-result-container">
            <div className="spacer" style={{ height: 0 }}></div>
            {[...Array(20).keys()].map((i) => (
              <div className="flex-row follower" key={i}>
                <div className="flex-0 margin-right-2">
                  <FCAccountAvatar
                    account={mockCreatorAccounts[0]}
                    hideOnlineIndicator={true}
                  />
                </div>
                <div className="flex-1 flex-col">
                  <div className="flex-row">
                    <div className="flex-1">
                      <FCAccountUsername
                        maxLength={12}
                        account={mockCreatorAccounts[0]}
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
        </>
      )}
    </div>
  )
}
