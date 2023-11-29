import { TPurchaseRecord, TTransactionRecord } from '@/types/payment'
import LocalizationString from '../common/LocalizationString'
import FCBalanceDisplay from '../common/subscription/FCBalanceDisplay'
import Link from 'next/link'
import FCAccountAvatar from '../common/account/FCAccountAvatar'
import FCAccountUsername from '../common/account/FCAccountUsername'
import { useEffect, useState } from 'react'
import { mockPurchaseHistory, mockTransactionHistory } from '@/mock/payment'
import { useAuth } from '@/contexts/auth'
import FCMedia from '../common/feed/FCMedia'
import { abbrString } from '@/utils/helpers'

type Props = {
  children?: React.ReactNode
  className?: string
  type: 'purchase' | 'transaction'
  [x: string]: any
}

export default function FCPaymentTransactionHistory({
  children,
  className = '',
  type,
  ...rest
}: Props) {
  const [bought, setBought] = useState<TPurchaseRecord[]>([])
  const [txs, setTxs] = useState<TTransactionRecord[]>([])
  const { user } = useAuth()
  useEffect(() => {
    const fetchTransaction = async () => {
      if (!user) return
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/wallet/get_transactions?userid=${user?.userID}`)
      const data = await response.json()
      const _records: TTransactionRecord[] = []
      data.forEach((txs: any) => {
        const _type = txs.dir === "D" ? "Deposit" : "Withdraw"
        const _date = new Date(txs.created_at)
        const formattedDate = `${_date.getMonth() + 1}/${_date.getDate()}/${_date.getFullYear()}`;
        const newRecord: TTransactionRecord = {
          type: "deposit",
          amount: txs.amount,
          hash: txs.tx_hash,
          date: formattedDate,
          walletAddress: txs.wallet_address,
        }
        _records.push(newRecord)
      });
      setTxs(_records)
    }
    const fetchPurchases = async () => {
      if (!user) return
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/user/get_purchases?userid=${user?.userID}`)
      const data = await response.json()
      const _records: TPurchaseRecord[] = []
      console.log(data)
      data.forEach((item: any) => {
        const _date = new Date(item.created_at)
        const formattedDate = `${_date.getMonth() + 1}/${_date.getDate()}/${_date.getFullYear()}`;
        const newRecord: TPurchaseRecord = {
          date: formattedDate,
          creator: {
            avatar: item.creator.avatar,
            username: item.creator.username,
            displayname: item.creator.displayname,
          },
          type: item.type,
          value: item.value,
          amount: item.amount
        }
        _records.push(newRecord)
      })
      setBought(_records)
    }

    fetchTransaction()
    fetchPurchases()
  }, [user])
  return (
    <div className={`fc-payment-transaction-history ${className}`} {...rest}>
      {type == 'purchase' ? (
        <PurchaseHistory data={bought} />
      ) : (
        <TransactionHistory data={txs} />
      )}
    </div>
  )



}

const PurchaseHistory = ({ data }: { data: TPurchaseRecord[] }) => {
  return (
    <>
      {data.map((item, i) => (
        <div
          className="flex-row flex-align-self-stretch margin-top-2 sm-mobile-visible flex-align-center"
          key={i}
        >
          <div className="flex-0">
            <div className={`fc-account-avatar `}>
              <Link
                className={`status-mode-0`}
                href={`/${item.creator.username}`}
              >
                {!item.creator.avatar ? (
                  <div className="avatar default-avatar">
                    <DefaultAvatarSVG />
                  </div>
                ) : (
                  <FCMedia
                    className="avatar"
                    data={{
                      id: "1",
                      type: 'image',
                      sourceid: item.creator.avatar,
                      timestamp: 123,
                    }}
                  />
                )}
              </Link>
            </div>
            <div className={`fc-account-username`}>
              <Link
                className={'username-wrapper'}
                href={`/${item.creator.username}`}
              >
                <div className="icon-wrapper flex-row flex-align-center">
                  <span className="display-name">
                    {abbrString(item.creator.displayname ? item.creator.displayname : "", 12)}
                  </span>
                  <div className="tooltip">
                    <span className="user-icon" style={{ color: 'var(--blue-1)' }}>
                      <span className="fa-stack">
                        <i className="fa-fw fas fa-badge fa-stack-2x"></i>
                        <i className="fa-fw fas fa-check fa-stack-1x fa-inverse"></i>
                      </span>
                    </span>
                  </div>

                  <div className="tooltip"></div>
                </div>

                {(
                  <span className="user-name">
                    {'@'}
                    {abbrString(item.creator.username, 12)}
                    <div className="transparent-dropdown display-inline">
                      <div className="dropdown-list">
                        <div className="dropdown-item">
                          <i className="fal fa-fw fa-note-sticky pointer"></i>
                          Edit User Notes
                        </div>
                        <div className="dropdown-item">
                          <i className="fal fa-fw fa-list"></i>
                          Add to List
                        </div>
                        <div className="dropdown-item">
                          <i className="fa-fw fal fa-ban"></i>
                          <LocalizationString>Block user</LocalizationString>
                        </div>
                      </div>
                    </div>
                  </span>
                )}
              </Link>
            </div>
          </div>
          <div className="flex-1 flex-col">
            <div className="flex-1 bold dark-blue-1">
              {item.date}
            </div>
            <div className="flex-1 bold">
              {item.type == 'subscribe' && (
                'Subscribe'
              )}
              {item.type == "tippost" && (
                <>
                  Purchased <Link target="_blank" href={`/post/${item.value}`}>Post</Link>
                </>
              )}
              {item.type == "media" && (
                "Purchased Media"
              )}
              {item.type == "tipuser" && (
                "Tipped the user"
              )}
            </div>
          </div>
          <div className="flex-0 bold balance dark-blue-1">
            <FCBalanceDisplay balance={10} />
          </div>
        </div>
      ))}
      <table className="sm-mobile-hidden">
        <thead>
          <tr>
            <th>
              <LocalizationString>Date</LocalizationString>
            </th>
            <th>
              <LocalizationString>Creator</LocalizationString>
            </th>
            <th>
              <LocalizationString>Description</LocalizationString>
            </th>
            <th>
              <LocalizationString>Total</LocalizationString>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i}>
              <td>{item.date}</td>
              <td>
                <div className="flex-row flex-align-center padding-left-2">
                  <div className={`fc-account-avatar `}>
                    <Link
                      className={`status-mode-0`}
                      href={`/${item.creator.username}`}
                    >
                      {!item.creator.avatar ? (
                        <div className="avatar default-avatar">
                          <DefaultAvatarSVG />
                        </div>
                      ) : (
                        <FCMedia
                          className="avatar"
                          data={{
                            id: "1",
                            type: 'image',
                            sourceid: item.creator.avatar,
                            timestamp: 123,
                          }}
                        />
                      )}
                    </Link>
                  </div>
                  <div className={`fc-account-username`}>
                    <Link
                      className={'username-wrapper'}
                      href={`/${item.creator.username}`}
                    >
                      <div className="icon-wrapper flex-row flex-align-center">
                        <span className="display-name">
                          {abbrString(item.creator.displayname ? item.creator.displayname : "", 12)}
                        </span>
                        <div className="tooltip">
                          <span className="user-icon" style={{ color: 'var(--blue-1)' }}>
                            <span className="fa-stack">
                              <i className="fa-fw fas fa-badge fa-stack-2x"></i>
                              <i className="fa-fw fas fa-check fa-stack-1x fa-inverse"></i>
                            </span>
                          </span>
                        </div>

                        <div className="tooltip"></div>
                      </div>

                      {(
                        <span className="user-name">
                          {'@'}
                          {abbrString(item.creator.username, 12)}
                          <div className="transparent-dropdown display-inline">
                            <div className="dropdown-list">
                              <div className="dropdown-item">
                                <i className="fal fa-fw fa-note-sticky pointer"></i>
                                Edit User Notes
                              </div>
                              <div className="dropdown-item">
                                <i className="fal fa-fw fa-list"></i>
                                Add to List
                              </div>
                              <div className="dropdown-item">
                                <i className="fa-fw fal fa-ban"></i>
                                <LocalizationString>Block user</LocalizationString>
                              </div>
                            </div>
                          </div>
                        </span>
                      )}
                    </Link>
                  </div>
                </div>
              </td>
              <td>
                {item.type == 'subscribe' && (
                  'Subscribe'
                )}
                {item.type == "tippost" && (
                  <>
                    Purchased <Link target="_blank" href={`/post/${item.value}`}>Post</Link>
                  </>
                )}
                {item.type == "media" && (
                  "Purchased Media"
                )}
                {item.type == "tipuser" && (
                  "Tipped the user"
                )}
              </td>
              <td>
                <div className="amount-title">
                  <FCBalanceDisplay balance={item.amount} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

const TransactionHistory = ({ data }: { data: TTransactionRecord[] }) => {
  return (
    <>
      {data.map((item, i) => (
        <div
          className="flex-row flex-align-self-stretch margin-top-2 sm-mobile-visible flex-align-center"
          key={i}
        >
          <div className="flex-0 margin-right-2">
            {item.type == 'deposit' ? (
              <i className="fa-fw fal fa-up fa-2x" />
            ) : (
              <i className="fa-fw fal fa-down fa-2x" />
            )}
          </div>
          <div className="flex-1 flex-col">
            <div className="flex-1 bold dark-blue-1">
              Monday, Oct 16, 2023 at 11:21 AM
            </div>
            {/* <div className="flex-1 bold">{item.type}</div> */}
            <div className="flex-1">
              <a
                target="_blank"
                href={`https://tronscan.org/#/address/${item.walletAddress}`}
              >
                {item.walletAddress}
              </a>
            </div>
            <div className="flex-1">
              <a
                target="_blank"
                href={`https://tronscan.org/#/transaction/${item.hash}`}
              >
                {item.hash}
              </a>
            </div>
          </div>
          <div className="flex-0 bold balance dark-blue-1">
            <FCBalanceDisplay balance={10} />
          </div>
        </div>
      ))}
      <table className="sm-mobile-hidden">
        <thead>
          <tr>
            <th>
              <LocalizationString>Date</LocalizationString>
            </th>
            <th>
              <LocalizationString>Type</LocalizationString>
            </th>
            <th>
              <LocalizationString>Wallet Address</LocalizationString>
            </th>
            <th>
              <LocalizationString>Hash</LocalizationString>
            </th>
            <th>
              <LocalizationString>Total</LocalizationString>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i}>
              <td>{item.date}</td>
              <td className="capitalize">{item.type}</td>
              <td>
                <a
                  target="_blank"
                  href={`https://tronscan.org/#/address/${item.walletAddress}`}
                >
                  {item.walletAddress}
                </a>
              </td>
              <td>
                <a
                  target="_blank"
                  href={`https://tronscan.org/#/transaction/${item.hash}`}
                >
                  {item.hash}
                </a>
              </td>
              <td>
                <div className="amount-title">
                  <FCBalanceDisplay balance={item.amount} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}


const DefaultAvatarSVG = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fal"
    data-icon="user"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    className="svg-inline--fa fa-user fa-w-14"
  >
    <g className="fa-group">
      <path
        fill="var(--dark-blue-1)"
        d="M352 128A128 128 0 1 1 224 0a128 128 0 0 1 128 128z"
        opacity="0.4"
        className="fa-secondary"
      ></path>
      <path
        fill="var(--dark-blue-1)"
        d="M313.6 288h-16.7a174.1 174.1 0 0 1-145.8 0h-16.7A134.43 134.43 0 0 0 0 422.4V464a48 48 0 0 0 48 48h352a48 48 0 0 0 48-48v-41.6A134.43 134.43 0 0 0 313.6 288z"
        className="fa-primary"
      ></path>
    </g>
  </svg>
)
