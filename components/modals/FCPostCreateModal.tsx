import LocalizationString from '../common/LocalizationString'
import FCPostCreation from '../post/FCPostCreation'
import { useAuth } from '@/contexts/auth'
import { useModalMeta } from '@/contexts/modal'
import { TPost } from '@/types/media'

type Props = {
  children?: React.ReactNode
  className?: string
  data: {
    reply: boolean,
    edit: boolean,
    postdata: TPost,
    parentid: string,
  }
  [x: string]: any
}

export default function FCPostCreateModal({
  children,
  className = '',
  data,
  ...rest
}: Props) {
  const { user } = useAuth()
  const { reply: isReply, edit: isEdit, postdata: postdata, parentid: parentid } = data
  const { pop } = useModalMeta()
  if (!user) {
    return <></>
  }

  return (
    <div className={`fc-post-create-modal ${className}`} {...rest}>
      <div className="modal">
        <div className="modal-header">
          {!isReply && !isEdit && (
            <div className="title flex-1">
              <LocalizationString>Post</LocalizationString>
            </div>
          )}
          {isEdit && (
            <div className="title flex-1">
            <LocalizationString>Edit Post</LocalizationString>
          </div>
          )}
          {isReply && (
            <div className="title flex-1">
              <LocalizationString>Reply to Post</LocalizationString>
            </div>
          )}

          <div className="actions" onClick={pop}>
            <i className="fa-fw fa fa-xmark pointer blue-1-hover-only hover-effect"></i>
          </div>
        </div>
        <div className="modal-content">
          <FCPostCreation
            className="border-color"
            account={user}
            displayMode={isReply ? 2 : (isEdit ? 5 : 1)}
            postdata={postdata}
            parentid={parentid ? parentid: "0"}
          />
        </div>
      </div>
    </div>
  )
}
