'use client'

import '@/styles/pages/subscriptions.scss'
import LocalizationString from '@/components/common/LocalizationString'
import { TAccount } from '@/types/account'
import SubscriptionCard from './SubscriptionCard'
import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/auth'
import { TSubscriptionCard } from '@/types/subscription'

type Props = {
  children?: React.ReactNode
  className?: string
  // accounts: Array<TAccount>
  [x: string]: any
}

export default function FCSubscriptionsRoute({
  children,
  className,
  // accounts,
  ...rest
}: Props) {
  // selected : 0 Active , 1 Expired , 2 All
  const [selected, setSelected] = useState(0)
  const [cards, setCards] = useState<TSubscriptionCard[]>([])
  const [activeCount, setActiveCount] = useState(0)
  const [expireCount, setExpireCount] = useState(0)

  const { user } = useAuth()
  useEffect(() => {
    if (!user) return
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/user/getSubscriptions?userid=${user.userID}&filter=${selected}`)
        const data = await response.json()
        const _cards: TSubscriptionCard[] = []
        data.forEach((element: any) => {
          const _date = new Date(element.expiration)
          const formattedDate = `${_date.getMonth() + 1}/${_date.getDate()}/${_date.getFullYear()}`;
          const _record: TSubscriptionCard = {
            creator: {
              userName: element.creator.username,
              displayName: element.creator.displayname,
              availability: "online",
              avatarUrl: element.creator.avatar,
              bannerUrl: element.creator.banner
            },
            tiername: element.tiername,
            status: element.astatus,
            expiration: formattedDate,
            baseprice: element.baseprice,
          }
          _cards.push(_record)
        })
        console.log(data)
        console.log(_cards)
        setCards(_cards)
      } catch (error) {
        console.log(error)
      }
    }
    const fetchSubscriptionCount = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/user/getSubscriptionsCount?userid=${user.userID}`)
        const data = await response.json()
        console.log(data)
        setActiveCount(parseInt(data.active))
        setExpireCount(parseInt(data.expired))
      } catch (error) {
        console.log(error)
      }
    }
    fetchSubscriptionCount()
    fetchSubscriptions()
  }, [selected, user])

  return (
    <div id="m_subscriptions_route" className={`${className ?? ''}`} {...rest}>
      <div className="page-content">
        <div className="current-page-wrapper">
          <div className="current-page">
            <span>
              <LocalizationString>Subscriptions</LocalizationString>
            </span>
          </div>
        </div>
        <div className="tab-nav-wrapper solid-highlight">
          <div className="tab-nav-items">
            <div
              className={`tab-nav-item ${selected == 0 && 'selected'}`}
              onClick={() => setSelected(0)}
            >
              <LocalizationString className="margin-right-text">
                Active
              </LocalizationString>{' '}
              ({activeCount})
            </div>
            <div
              className={`tab-nav-item ${selected == 1 && 'selected'}`}
              onClick={() => setSelected(1)}
            >
              <LocalizationString className="margin-right-text">
                Expired
              </LocalizationString>{' '}
              ({expireCount})
            </div>
            <div
              className={`tab-nav-item ${selected == 2 && 'selected'}`}
              onClick={() => setSelected(2)}
            >
              <LocalizationString className="margin-right-text">
                All
              </LocalizationString>{' '}
              ({activeCount + expireCount})
            </div>
          </div>
        </div>

        <div className="subscriptions">
          {cards.length == 0 && (
            <div className="font-size-sm dark-blue-1 text-center flex-1">
              <LocalizationString>
                You don&apos;t have any subscriptions yet, they will display
                here once you are subscribed to someone.
              </LocalizationString>
            </div>
          )}

          {/* Subscriptions */}
          {cards.map((card, i) => (
            <SubscriptionCard card={card} key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
