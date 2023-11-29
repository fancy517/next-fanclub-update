import { useModalMeta } from '@/contexts/modal'
import DarkLogo from '@/public/logos/fansly_dark_v3.webp'
import LightLogo from '@/public/logos/fansly_light_v3.webp'
import LogoOnly from '@/public/logos/fansly_logo_only.webp'
import Image from 'next/image'

type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function FCAgeGateModal({
  children,
  className = '',
  ...rest
}: Props) {
  const { forcePop } = useModalMeta()

  const leave = () => {
    window.location.replace('https://google.com')
  }

  return (
    <div className={`fc-age-gate-modal ${className}`} {...rest}>
      <div className="modal">
        <div className="modal-content">
          <div className="logo flex-0">
            <Image
              src={DarkLogo}
              alt=""
              className="sm-mobile-hidden dark-theme-only"
            />
            <Image
              src={LightLogo}
              alt=""
              className="sm-mobile-hidden bright-theme-only"
            />
            <Image alt="" src={LogoOnly} className="sm-mobile-visible" />
          </div>
          <div className="margin-top-4 flex-0">
            <div className="text-center font-size-lg semi-bold">
              {' '}
              Possible Age Restricted Content
            </div>
          </div>
          <div className="margin-top-4 scroll-text flex-1">
            {' '}
            This website (Fansly) contains age-restricted content. If you are
            under the age of 18 years or under the age of majority in the
            location from where you are accessing this website, you do not have
            authorization or permission to enter this website or access any of
            its content. If you are over the age of 18 years or over the age of
            majority in the location from where you are accessing this website
            by entering the website you hereby agree to comply with the{' '}
            <span className="bold pointer blue-1-hover-only">
              Fansly Terms of Service
            </span>
            . <br />
            <br />
            By clicking on the "Enter" button, and by entering this website you
            agree with all the above and certify under penalty of perjury that
            you are above the age of 18 or the age of majority in your location,
            whichever is greater.{' '}
          </div>
          <div className="flex-row flex-center margin-top-4 flex-0">
            <div className="button-wrapper">
              <div className="btn large flex-1" onClick={leave}>
                Leave
              </div>
              <div
                className="btn large solid-green flex-1"
                onClick={() => {
                  window.localStorage.setItem('isNewbie', 'false')
                  forcePop()
                }}
              >
                Enter
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
