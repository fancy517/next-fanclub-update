'use client'

import LocalizationString from '@/components/common/LocalizationString'
import FCButton from '@/components/common/button/FCButton'
import FCBalanceDisplay from '@/components/common/subscription/FCBalanceDisplay'
import XDDropdown from '@/components/common/xd/XDDropdown'
import '@/styles/pages/affiliate.scss'
import Link from 'next/link'

type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function FCAffiliateRoute({
  children,
  className,
  ...rest
}: Props) {
  return (
    <div id="m_affiliate_route" className={`${className ?? ''}`} {...rest}>
      <div className="page-content">
        <div className="current-page-wrapper">
          <div className="current-page">
            <span>
              <LocalizationString>Referrals</LocalizationString>
            </span>
          </div>
        </div>
        <div className="flex-col padding-left-1">
          <div className="green-1 flex-align-self-start">
            <LocalizationString className="margin-right-text">
              Fansly referrals allows you to help grow our community while
              earning money! Click
            </LocalizationString>
            <a
              className="pointer bold margin-right-text"
              style={{ textDecoration: 'underline' }}
            >
              <LocalizationString>here</LocalizationString>
            </a>
            <LocalizationString>to see how it works.</LocalizationString>
          </div>
        </div>
        <div className="flex-row flex-justify-space-around margin-bottom-4 margin-top-2 flex-wrap">
          <div className="flex-col flex-1 max-width margin-bottom-2 margin-left-1 margin-right-1 max-width-100">
            <div className="input-title">
              <LocalizationString> Refer a Fan</LocalizationString>
            </div>
            <div className="dark-blue-1 font-size-xs margin-bottom-1">
              <LocalizationString>
                Link fans to your page with this to earn 1% of their purchases
                for 90 days. After 90 days they can be relinked to another code.
              </LocalizationString>
              <i className="fa-fw fal fa-copy pointer blue-1-hover-only font-size-xxl margin-left-xs"></i>
            </div>
            <div className="flex-row">
              <div className="input-group">
                <div className="input-addon round-left">https://fans.ly/r/</div>
                <input
                  type="text"
                  placeholder="Your Code"
                  className="flex-1 ng-untouched ng-pristine ng-valid"
                />
                <FCButton className="input-addon btn outline-blue round-right">
                  <LocalizationString>Save</LocalizationString>
                </FCButton>
              </div>
            </div>
            <div className="dark-blue-1 margin-top-1 font-size-sm">
              <LocalizationString>
                Select what should happen when a fan visits your referral link.
              </LocalizationString>
            </div>
            <div className="flex-row margin-top-text">
              <XDDropdown
                className="flex-row flex-align-center dropdown-trigger select-method"
                placeholder="Redirect to My Profile"
                data={['Redirect to My Profile', 'Redirect to the Homepage']}
                renderer={(v) => <LocalizationString>{v}</LocalizationString>}
              />
            </div>
          </div>
          <div className="flex-col flex-1 max-width margin-left-1 margin-right-1 max-width-100">
            <div className="input-title">
              <LocalizationString>Refer a Model</LocalizationString>
            </div>
            <div className="dark-blue-1 font-size-xs margin-bottom-1">
              <LocalizationString>
                Earn 5% on a Models sales when they use your Model Referral Code
                in their model application. You earn this 5% for a year and then
                it changes to 1.5%
              </LocalizationString>
              <i className="fa-fw fal fa-copy pointer blue-1-hover-only font-size-xxl margin-left-xs"></i>
            </div>
            <div className="flex-row">
              <div className="input-group">
                <div className="input-addon round-left">
                  https://fans.ly/application/form?r=
                </div>
                <input
                  type="text"
                  placeholder="Create Model Referral Code"
                  className="flex-1 ng-untouched ng-pristine ng-valid"
                />
                <FCButton className="input-addon btn outline-blue round-right">
                  <LocalizationString>Save</LocalizationString>
                </FCButton>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-row flex-justify-center">
          <div className="bold margin-2 font-size-xl">
            <LocalizationString>Your Referral Codes</LocalizationString>
          </div>
        </div>
        <div className="withdraw-info bg-2 margin-bottom-4">
          <div className="withdraw-title flex-col flex-align-center">
            <div className="font-size-lg bold dark-blue-1">
              <span>
                <LocalizationString>Your Referral Code</LocalizationString>
              </span>
            </div>
            96213
          </div>
          <div className="flex-row flex-justify-space-around margin-top-4">
            <div className="flex-col flex-1">
              <div className="flex-row flex-justify-center dark-blue-1 margin-bottom-1 bold">
                <LocalizationString>Total Earnings</LocalizationString>
              </div>
              <div className="flex-row flex-justify-center white-2 font-size-xs">
                <FCBalanceDisplay balance={0} />
              </div>
            </div>
            <div className="flex-col flex-1">
              <div className="flex-row flex-justify-center dark-blue-1 margin-bottom-1 bold">
                <LocalizationString>Affiliate Percentage</LocalizationString>
              </div>
              <div className="flex-row flex-justify-center white-2 font-size-xs">
                1%
              </div>
            </div>
            <div className="flex-col flex-1">
              <div className="flex-row flex-justify-center dark-blue-1 margin-bottom-1 bold">
                <LocalizationString>Total claims</LocalizationString>
              </div>
              <div className="flex-row flex-justify-center white-2 font-size-xs">
                0
              </div>
            </div>
          </div>
          <div className="seperator bg-4 alpha-675"></div>
          <div className="flex-row flex-justify-center">
            <div className="flex-row">
              <Link href={'/application'} className="btn outline-blue">
                <LocalizationString>Withdraw</LocalizationString>
              </Link>
            </div>
          </div>
        </div>
        <div className="withdraw-info bg-2 margin-bottom-4">
          <div className="withdraw-title flex-col flex-align-center">
            <div className="font-size-lg bold dark-blue-1">
              <span>
                <LocalizationString>
                  Your Model Referral Code
                </LocalizationString>
              </span>
            </div>
            3246513
          </div>
          <div className="flex-row flex-justify-space-around margin-top-4">
            <div className="flex-col flex-1">
              <div className="flex-row flex-justify-center dark-blue-1 margin-bottom-1 bold">
                <LocalizationString>Total Earnings</LocalizationString>
              </div>
              <div className="flex-row flex-justify-center white-2 font-size-xs">
                <FCBalanceDisplay balance={0} />
              </div>
            </div>
            <div className="flex-col flex-1">
              <div className="flex-row flex-justify-center dark-blue-1 margin-bottom-1 bold">
                <LocalizationString>Affiliate Percentage</LocalizationString>
              </div>
              <div className="flex-row flex-justify-center white-2 font-size-xs">
                5%
              </div>
            </div>
            <div className="flex-col flex-1">
              <div className="flex-row flex-justify-center dark-blue-1 margin-bottom-1 bold">
                <LocalizationString>Total claims</LocalizationString>
              </div>
              <div className="flex-row flex-justify-center white-2 font-size-xs">
                0
              </div>
            </div>
          </div>
          <div className="seperator bg-4 alpha-675"></div>
          <div className="flex-row flex-justify-center">
            <div className="flex-row">
              <Link href={'/application'} className="btn outline-blue">
                <LocalizationString>Withdraw</LocalizationString>
              </Link>
              <div className="btn solid-blue margin-left-1">
                <LocalizationString>Show Users</LocalizationString>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
