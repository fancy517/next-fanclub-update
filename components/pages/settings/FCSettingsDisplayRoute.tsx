import FCThemeController from '@/components/common/FCThemeController'
import LocalizationString from '@/components/common/LocalizationString'

type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function FCSettingsDisplayRoute({
  children,
  className,
  ...rest
}: Props) {
  return (
    <div className={`fc-settings-display-route ${className ?? ''}`} {...rest}>
      <div>
        <div className="bold">
          <LocalizationString>Dark/Light Mode</LocalizationString>
        </div>
        <div className="font-size-sm dark-blue-1 margin-bottom-text">
          <LocalizationString>
            Changes the color scheme for Fansly for easy browsing in all
            settings!
          </LocalizationString>
        </div>
        <FCThemeController innerClassname="btn outline-blue" />
        {/* <div className="bold margin-top-3">
          <LocalizationString>Fansly Language</LocalizationString>
        </div>
        <div className="font-size-sm dark-blue-1">
          <LocalizationString>
            Fansly is available in multiple Languages, select the language you
            wish to view the website in!
          </LocalizationString>
        </div>
        <div className="flex-row margin-top-1">
          <app-xd-localization-select _nghost-ng-c611553075="">
            <div
              _ngcontent-ng-c611553075=""
              appxddropdown=""
              className="transparent-dropdown"
            >
              <div
                _ngcontent-ng-c611553075=""
                className="btn outline-blue pure-white"
              >
                <i
                  _ngcontent-ng-c611553075=""
                  className="fa-fw fal fa-globe margin-right-text"
                ></i>
                Language
              </div>
              <div
                _ngcontent-ng-c611553075=""
                className="dropdown-list top left"
              ></div>
            </div>
          </app-xd-localization-select>
        </div> */}
      </div>
    </div>
  )
}
