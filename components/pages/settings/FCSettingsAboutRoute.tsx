import LocalizationString from '@/components/common/LocalizationString'

type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function FCSettingsAboutRoute({
  children,
  className = '',
  ...rest
}: Props) {
  return (
    <div className={`${className}`} {...rest}>
      <div className="bold">
        <LocalizationString>About</LocalizationString>
      </div>
      <div className="dark-blue-1">
        <LocalizationString>
          If you are experiencing issues with Fansly its recommended to check
          for updates and/or reload Fansly. If you are still experiencing issues
          feel free to open up a support ticket by clicking the support on the
          bottom right side of the screen or via the menu (Click on your
          avatar). If you are unable to find the support button on the site you
          may also contact us at support@fanclub.com.
        </LocalizationString>
      </div>
    </div>
  )
}
