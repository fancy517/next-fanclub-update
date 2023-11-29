import LocalizationString from '@/components/common/LocalizationString'
import Link from 'next/link'

type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function TimelineFilters({
  children,
  className,
  ...rest
}: Props) {
  return (
    <div className="timeline-filters">
      <div className="tab-nav-wrapper">
        <div className="bubble-wrap">
          <div className="bubble active">
            <LocalizationString>All</LocalizationString>
          </div>
          <div className="bubble">
            <LocalizationString>Subscribed</LocalizationString>
          </div>
          <Link
            href="/explore/foryou"
            className="bubble text-decoration-none"
            style={{ color: 'inherit' }}
          >
            <LocalizationString>For You</LocalizationString>
          </Link>
          <div className="bubble">
            <i className="fal fa-arrows-rotate pointer blue-1"></i>
          </div>
          <div className="bubble">
            <i className="fal fa-pencil pointer blue-1"></i>
          </div>
        </div>
      </div>
    </div>
  )
}
