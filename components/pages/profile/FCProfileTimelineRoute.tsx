import LocalizationString from '@/components/common/LocalizationString'
import FCTimeline from '@/components/common/timeline/FCTimeline'

type Props = {
  children?: React.ReactNode
  className?: string
  username?: string
  selecttag?: string
  [x: string]: any
}

export default function FCProfileTimelineRoute({
  children,
  className,
  username,
  selecttag,
  ...rest
}: Props) {
  return (
    <div className={`fc-profile-timeline-route ${className ?? ''}`} {...rest}>
      <div className="flex-row flex-justify-end flex-align-center search-wrapper">
        <div className="material-input search-posts flex-1 icon-right icon-left margin-right-2 visible">
          {/* <input
            // autocomplete="off"
            // autocorrect="off"
            // spellcheck="false"
            type="text"
            required={true}
            className="ng-untouched ng-pristine ng-invalid"
          />
          <div className="label">
            <LocalizationString>Search Timeline</LocalizationString>
          </div>
          <div className="placeholder">
            <LocalizationString>Enter Search Text</LocalizationString>
          </div>
          <div className="icon-left">
            <i className="fa-light fa-magnifying-glass blue-1 pointer"></i>
          </div>
          <div className="icon-right highlight-icon"></div> */}
        </div>
        <i className="fa-fw fal fa-arrows-rotate blue-1 pointer margin-right-2 hover-effect"></i>
      </div>

      <FCTimeline username={username} selecttag={selecttag} />
    </div>
  )
}
