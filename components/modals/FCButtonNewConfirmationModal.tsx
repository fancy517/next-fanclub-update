import { useModalMeta } from '@/contexts/modal'
import '@/styles/modals/button_new_confirmation.scss'

type Props = {
  children?: React.ReactNode
  className?: string
  data: {
    content: React.ReactNode
    cb: (status:string) => void
  }
  [x: string]: any
}

export default function FCButtonNewConfirmationModal({
  children,
  className = '',
  data,
  ...rest
}: Props) {
  const { pop } = useModalMeta()
  const { content, cb } = data
  const onYes = () => {
    cb && cb("yes")
    pop()
  }
  return (
    <div className={`fc-button-new-confirmation-modal ${className}`} {...rest}>
      <div className="modal">
        <div className="modal-header">
          <div className="title">Are you sure?</div>
          <div className="actions" onClick={pop}>
            <i className="fa fa-xmark pointer blue-1-hover-only"></i>
          </div>
        </div>
        <div className="modal-content">
          <div className="">
            <div slot="confirmation_content">{content}</div>
          </div>
        </div>
        <div className="modal-footer margin-top-1">
          <div className="btn solid-red large margin-right-2" onClick={pop}>
            Cancel
          </div>
          <div className="btn solid-blue large" onClick={onYes}>
            Yes
          </div>
        </div>
      </div>
    </div>
  )
}
