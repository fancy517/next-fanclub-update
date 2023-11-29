import LocalizationString from '@/components/common/LocalizationString'

type Props = {
  children?: React.ReactNode
  className?: string
  onNewMsg: () => void
  [x: string]: any
}

export default function FCMessagesDefaultConversationRoute({
  children,
  className,
  onNewMsg,
  ...rest
}: Props) {
  return (
    <div
      className={`fc-messages-default-conversation-route ${className}`}
      {...rest}
    >
      <div className="bold">
        <LocalizationString>
          You don&apos;t have a conversation selected
        </LocalizationString>
      </div>
      <div className="dark-blue-1 margin-bottom-1">
        <LocalizationString>
          Select a conversation on the left or start a new one.
        </LocalizationString>
      </div>
      <div className="btn solid-blue wider" onClick={onNewMsg}>
        <LocalizationString>New Message</LocalizationString>
      </div>
    </div>
  )
}
