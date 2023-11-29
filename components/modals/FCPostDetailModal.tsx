import { useAuth } from '@/contexts/auth'
import { useModalMeta } from '@/contexts/modal'
import { TPost } from '@/types/media'
import LocalizationString from '../common/LocalizationString'
import FCPost from '../common/feed/FCPost'

type Props = {
    children?: React.ReactNode
    className?: string
    data: {
      postdata: TPost,
    }
    [x: string]: any
  }

export default function FCPostDetailModal({
    children,
    className = '',
    data,
    ...rest
}: Props) {
  const { pop, push } = useModalMeta()
  console.log(data)
  const close = () => {
    pop()
  }
  return (
    <div className={`fc-post-detail-modal ${className}` } {...rest}>
      <div className='modal'>
        <div className="modal-header">
          <div className="title flex-1">
            <LocalizationString>Post Detail</LocalizationString>
          </div>
          <div style={{cursor:"pointer"}} onClick={close}>X</div>
        </div>
        <div className='modal-content' style={{overflow:"auto", maxHeight:"80vh", width:"60vw"}}>
          <FCPost className="feed-item" data={ data.postdata } isModal={true} isReply={false}/>
        </div>
      </div>
    </div>
  )
}