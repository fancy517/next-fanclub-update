'use client'

import '@/styles/pages/list.scss'

import { useRouter } from 'next/navigation'

import LocalizationString from '@/components/common/LocalizationString'
import { TList } from '@/types'
import { TAccount } from '@/types/account'

import FCListItem from './FCListItem'
import { TSimpleAccount } from '@/types/payment'

type Props = {
  children?: React.ReactNode
  className?: string
  listname: string
  items: Array<TSimpleAccount>
  listid: string
  cb?: () => void
  [x: string]: any
}

export default function FCListRoute({
  children,
  className,
  listname,
  items,
  listid,
  cb,
  ...rest
}: Props) {
  const router = useRouter()
  const goBack = () => router.push('/lists')
  console.log(items)
  return (
    <div id="m_list_route" className={`${className ?? ''}`} {...rest}>
      <div className="flex-row border-bottom-1 padding-bottom-2 padding-left-text padding-right-text">
        <div className="bold flex-1">
          <i
            className="fa-fw fa fa-arrow-left pointer blue-1-hover-only hover-effect margin-right-1"
            onClick={goBack}
          ></i>
          {listname}
        </div>
      </div>

      {items.length == 0 && (
        <div className="text-center margin-top-1 dark-blue-1">
          <LocalizationString>
            You have no entries on this list.
          </LocalizationString>
        </div>
      )}

      <div className="flex-col margin-top-1">
        {items.map((item, i) => (
          <FCListItem account={item} key={i} listid={listid} cb={() => { cb && cb() }} />
        ))}
      </div>
    </div>
  )
}
