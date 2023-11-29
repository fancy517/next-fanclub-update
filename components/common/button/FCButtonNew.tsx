import { useModalMeta } from '@/contexts/modal'

type Props = {
  children?: React.ReactNode
  className?: string
  buttonContent: React.ReactNode
  confirmationContent: React.ReactNode
  cb: (status:string) => void
  [x: string]: any
}

export default function FCButtonNew({
  children,
  className,
  buttonContent,
  confirmationContent,
  cb,
  ...rest
}: Props) {
  const { push } = useModalMeta()
  const showModal = () => {
    if(buttonContent.props.className.search("disabled") !== -1){
      return
    }
    push({
      id: 'buttonnewconfirmation',
      data: {
        content: confirmationContent,
        cb: (status:string) => { cb("yes")},
      },
    })
  }

  return (
    <div
      className={`fc-button-new ${className ?? ''}`}
      onClick={showModal}
      {...rest}
    >
      <div className="flex-1">
        <div slot="button_content">{buttonContent}</div>
        <div className="confirmation-content">
          <div slot="confirmation_content">{confirmationContent}</div>
        </div>
      </div>
    </div>
  )
}
