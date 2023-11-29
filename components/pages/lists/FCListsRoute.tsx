'use client'

import LocalizationString from '@/components/common/LocalizationString'
import '@/styles/pages/lists.scss'
import FCList from './FCList'
import { TList } from '@/types'
import { useRouter } from 'next/navigation'
import { useModalMeta } from '@/contexts/modal'

type Props = {
  children?: React.ReactNode
  className?: string
  lists: Array<TList>
  cb?: () => void
  [x: string]: any
}

export default function FCListsRoute({ lists, cb, ...rest }: Props) {
  const router = useRouter()
  const { push } = useModalMeta()


  const showCreateModal = () =>
    push({ id: 'createlist', data: { cb: () => { cb && cb() } } })
  console.log(lists)
  return (
    <div id="m_lists_route">
      <div className="flex-col page-content" style={{ paddingBottom: '50px' }}>
        <div className="flex-row border-bottom-1 padding-bottom-2 padding-left-text padding-right-text">
          <div className="bold flex-1">
            <LocalizationString>My lists</LocalizationString>
          </div>
          <div onClick={showCreateModal}>
            <i className="fa-fw fa fa-plus hover-effect pointer blue-1-hover-only"></i>
          </div>
        </div>
        <div className="flex-col margin-top-text">
          {lists.map((list, index) => (
            <div key={index} onClick={() => router.push(`/lists/${list.id}`)}>
              <FCList data={list} key={index} cb={() => { cb && cb() }} />
            </div>
          ))}

          {lists.length === 0 && (
            <div className="text-center dark-blue-1 margin-top-1">
              <LocalizationString>
                You do not have any lists yet, click on the plus sign to create
                one!
              </LocalizationString>
            </div>
          )}

          {/* <div xddragsortablecontainer=""></div> */}
        </div>
      </div>
    </div>
  )
}
