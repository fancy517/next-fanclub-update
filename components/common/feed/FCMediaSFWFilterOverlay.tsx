'use client'

import { useRouter } from 'next/navigation'

type Props = {
  children?: React.ReactNode
  className?: string
  showOnlyIcon?: boolean
  onView: () => void
  [x: string]: any
}

export default function FCMediaSFWFilterOverlay({
  children,
  className,
  showOnlyIcon = false,
  onView,
  ...rest
}: Props) {
  const router = useRouter()

  const disableFilter = () => router.push('/settings/privacy')

  return (
    <div className="fc-media-sfw-filter-overlay sfw-button-container flex-col flex-align-center flex-center">
      <i className="pure-white fa-fw fas fa-eye-slash fa-2x shadow"></i>
      {!showOnlyIcon && (
        <>
          <div className="bold pure-white shadow margin-top-2">
            Sensitive Content
          </div>
          <div className="pure-white shadow margin-top-1 text-center font-size-xs">
            This content may be sensitive to some users. You must be 18 or older
            to view this content.
          </div>
          <div className="flex-row flex-align-center margin-top-3">
            <div
              className="btn solid-blue small margin-right-1"
              onClick={onView}
            >
              <i className="fa-fw fas fa-eye"></i> View
            </div>
            <div className="btn small" onClick={disableFilter}>
              <i className="fa-fw fas fa-gear"></i> Disable Filter
            </div>
          </div>
        </>
      )}
    </div>
  )
}
