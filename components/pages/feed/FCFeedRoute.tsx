'use client'

import '@/styles/pages/feed.scss'
import FCOnlineFollowingStreams from './FCOnlineFollowingStreams'
import FCFollowingMediaStories from './FCFollowingMediaStories'
import TimelineFilters from './TimelineFilters'
import NewVersionBanner from './NewVersionBanner'
import PWAInstallButton from './PWAInstallButton'
import FCTimeline from '@/components/common/timeline/FCTimeline'
import FCSideBarRight from '@/components/common/sidebar/FCSideBarRight'
import FCSuggestionsSideBarNew from './FCSuggestionsSideBarNew'
import { useModalMeta } from '@/contexts/modal'

type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function FCFeedRoute({ children, className, ...rest }: Props) {
  const { push } = useModalMeta()
  const showPostModal = () => push({ id: 'postcreate', data: { reply: true } })

  return (
    <div id="m_feed_route" className={`${className ?? ''}`} {...rest}>
      <div className="page-content">
        <div className="feed-wrapper">
          <div className="feed-content-wrapper">
            <FCOnlineFollowingStreams className="feed-item sm-mobile-visible" />
            <FCFollowingMediaStories className="flex-row stories" />

            <TimelineFilters />

            <NewVersionBanner />
            <PWAInstallButton />

            <FCTimeline className="feed-content" suggestions="123" />
          </div>

          <FCSideBarRight>
            <FCOnlineFollowingStreams className="feed-suggestions margin-top-2" />
            <FCSuggestionsSideBarNew className="feed-suggestions margin-top-2" />
          </FCSideBarRight>
        </div>
      </div>

      <div
        className="sm-mobile-visible mobile-new-post-button"
        onClick={showPostModal}
      >
        <i className="fa-fw fal fa-square-plus"></i>
      </div>
    </div>
  )
}
