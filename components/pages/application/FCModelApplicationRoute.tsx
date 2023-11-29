'use client'
import LocalizationString from '@/components/common/LocalizationString'
import FCFaqCollapsible from '@/components/common/faq/FCFaqCollapsible'
import { useAuth } from '@/contexts/auth'

import '@/styles/pages/application.scss'
import Link from 'next/link'
import { toast } from 'react-toastify'
type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

const faqs = [
  {
    title: 'How much money will I earn with Fansly?',
    text: 'As a model you earn 80% of everything you sell on the site. Users can subscribe and pay monthly to you or you can sell media directly to them at a fixed one time cost.',
  },
  {
    title: 'What payment methods are used for payouts?',
    text: 'We offer payouts via Bank Transfer (ACH/SEPA), local country methods, and Paxum.',
  },
  {
    title: 'How are my earnings calculated?',
    text: 'As a model selling content and subscriptions you will earn 80% of what users pay to you. If you earn $100 on fansly you will receive $80.',
  },
  {
    title: 'How frequent are payouts?',
    text: 'Payouts on Fansly are typically sent in 3 business days by bank transfer.',
  },
  {
    title: 'Can I use the affiliate system even if I am not verified?',
    text: 'Yes, your earnings will accumulate but you must get verified in order to receive a payout.',
  },
]

export default function FCModelApplicationRoute({
  children,
  className,
  ...rest
}: Props) {
  const { user } = useAuth()

  const onClickApplication = async () => {
    if (!user) {
      toast.warning("Please sign in to submit an application")
    }
    else if (user.userType === "admin" || user.userType === "creator") {
      toast.warning("You don't need to submit an application")
    } else if (user.userType === "needactivate") {
      toast.warning("Please activate first")
    } else if (user.userType === "user") {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/user/get_application_status?username=${user.userName}`)
        const data = await response.json()
        if (data === -1) {
          window.location.href = "/application/form"
        } else if (data === 0) {
          toast.info("You have submitted the application")
        } else if (data === 1) {
          toast.info("You are a creator")
        } else if (data === 2) {
          toast.warning("Your application has been rejected")
        } else {
          toast.error("Error creating the application")
        }
      } catch (e) {
        console.log(e)
        toast.error("Error Occured")
      }
    }
  }
  return (
    <div
      id="m_model_application_route"
      className={`${className ?? ''}`}
      {...rest}
    >
      <div className="page-content">
        <div className="current-page-wrapper">
          <div className="current-page">
            <span>
              <LocalizationString>Become A Model</LocalizationString>
            </span>
          </div>
        </div>
        <div className="sign-up-banner">
          <div className="background-gradient"></div>
          <div className="sign-up-topper"></div>
          <div className="sign-up-text">
            <span>
              <LocalizationString>
                Apply and be a Verified Model within a Couple Hours!
              </LocalizationString>
            </span>
          </div>
          <div className="sign-up-buttons flex-row flex-center">
            {/* <Link href="/application/form" className="btn solid-blue large">
              <LocalizationString>Application</LocalizationString>
            </Link> */}
            <div className='btn solid-blue large' onClick={onClickApplication}>
              <LocalizationString>Application</LocalizationString>
            </div>
          </div>
          <div className="sign-up-footer"></div>
        </div>
        <div className="flex-row flex-center category-title">
          <LocalizationString>What sets us Apart?</LocalizationString>
        </div>
        <div className="flex-row flex-sm-col info-circle-container">
          <div className="info-circle">
            <div className="flex-row image-banner">
              <i className="fa-fw fal fa-hands-holding-dollar"></i>
            </div>
            <div className="margin-bottom-1 flex-1">
              <div className="bold font-size-xl">
                <LocalizationString>Internal Promotion</LocalizationString>
              </div>
              <LocalizationString>
                Benefit from internal promotion via our FYP media swipe browser
                and user tailored suggestion algorithm. Gaining followers and
                subscribers directly through Fansly allows you to spend your
                time perfecting your content and doing the things you enjoy.
              </LocalizationString>
            </div>
          </div>
          <div className="info-circle">
            <div className="flex-row image-banner">
              <i className="fa-fw fal fa-hands-holding-dollar"></i>
            </div>
            <div className="margin-bottom-1 flex-1">
              <div className="bold font-size-xl">
                <LocalizationString>Referral Bonuses</LocalizationString>
              </div>
              <LocalizationString>
                You will be given a special link that will link customers to
                your account. You will earn 1% commission on everything the
                customer spends on Fansly for 90 days.
              </LocalizationString>
              <div className="margin-bottom-1 flex-1">
                <LocalizationString className="margin-right-text">
                  Also, you will earn
                </LocalizationString>
                <span className="bold margin-right-text">5%</span>
                <LocalizationString>
                  commission of the models you refer to Fansly for a year. After
                  that year is over you will earn a 1.5% lifetime commission.
                </LocalizationString>
              </div>
            </div>
          </div>
          <div className="info-circle text-center">
            <div className="flex-row image-banner text-center">
              <i className="fa-fw fal fa-face-kiss-wink-heart"></i>
            </div>
            <div className="flex-1 text-center">
              <div className="margin-bottom-1">
                <div className="bold font-size-xl">Emojis</div>
                <LocalizationString>
                  Sell the option to peel off an emoji/text over your photos.
                  You can give a taste of your media before users purchase it or
                  subscribe to you. You have the option to use emojis and text
                  if you want for higher conversion rates!
                </LocalizationString>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-row flex-sm-col info-circle-container text-center">
          <div className="info-circle">
            <div className="flex-row image-banner">
              <i className="fa-fw fal fa-user-group"></i>
            </div>
            <div className="margin-bottom-1 flex-1">
              <div className="bold font-size-xl">
                <LocalizationString>
                  Followers and Subscribers
                </LocalizationString>
              </div>
              <LocalizationString>
                Users can &quot;follow&quot; your account for free and you can
                choose to post media/video/text to them or send DMs to them.
                This allows for users to constantly see and be reminded that you
                are a creator on the platform if they decide to choose to pay
                and subscribe to you.
              </LocalizationString>
            </div>
          </div>
        </div>
        <div className="flex-row flex-sm-col info-circle-container">
          <div className="info-circle">
            <div className="flex-row image-banner">
              <i className="fa-fw fal fa-dollar-sign"></i>
            </div>
            <div className="margin-bottom-1 flex-1">
              <div className="bold font-size-xl">
                <LocalizationString>80-20 Split</LocalizationString>
              </div>
              <LocalizationString>
                Fansly only takes a 20% fee of your earnings. You are left with
                80% of your subscription and direct sales earnings plus your
                referral earnings
              </LocalizationString>
            </div>
          </div>
        </div>
        <div className="seperator border-bg-color"></div>
        <div className="flex-row flex-center category-title">
          <LocalizationString>Becoming a Model FAQ</LocalizationString>
        </div>

        {faqs.map((faq) => (
          <FCFaqCollapsible
            className="faq"
            title={faq.title}
            text={faq.text}
            key={faq.title}
          />
        ))}
      </div>
    </div>
  )
}
