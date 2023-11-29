import FCButton from '@/components/common/button/FCButton'
import FCDMPermissionFlagsDisplay from './FCDMPermissionFlagsDisplay'
import { useModalMeta } from '@/contexts/modal'
import { TAccount } from '@/types/account'
import FCAccountUsername from '../common/account/FCAccountUsername'
import FCTipAttachmentPreview from './FCTipAttachmentPreview'
import { useEffect, useRef, useState } from 'react'
import LocalizationString from '../common/LocalizationString'
import useOutsideClick from '@/hooks/useOutsideClick'
import Dropdown from '../common/dropdown'

type Props = {
  children?: React.ReactNode
  className?: string
  account: TAccount
  replying: boolean
  onCloseReply: () => void
  [x: string]: any
}

export default function FCGroupMessageInput({
  children,
  className = '',
  account,
  replying,
  onCloseReply,
  ...rest
}: Props) {
  const { push } = useModalMeta()
  const showTipModal = () => push({ id: 'createtip', data: { account, tip_type: "USER" } })
  const showtippreview = true
  const [canSend, setCanSend] = useState(false)
  const [text, setText] = useState('')
  const [textLineCount, setTextLineCount] = useState(1)

  useEffect(() => {
    if (text == '') setCollapsed(false)
    setCanSend(text != '')
    setTextLineCount(Math.min(4, text.split('\n').length))
  }, [text])

  const sendText = () => {
    if (!canSend) return
    setText('')
  }

  // image upload dropdown
  const [open, setOpen] = useState(false)
  const trigger = useRef(null)
  const target = useRef(null)
  useOutsideClick(trigger, target, () => setOpen(false))

  // collapse
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className={`fc-group-message-input ${className}`} {...rest}>
      {replying && (
        <div className="reply-to flex-row font-size-sm">
          <span className="margin-right-05">Replying to</span>
          <FCAccountUsername
            account={account}
            maxLength={12}
            className="user-name"
            hideUsername={true}
            showVerifiedBadge={false}
          />

          <div className="pointer margin-left-auto" onClick={onCloseReply}>
            <i className="fa-fw fal fa-xmark"></i>
          </div>
        </div>
      )}

      <div className="message-attachments">
        <div className="attachment"></div>
        <div className="attachment"></div>
        <div className="attachment"></div>
      </div>

      {showtippreview ? (
        <FCTipAttachmentPreview className="margin-left-1 font-size-sm margin-right-1" />
      ) : (
        <div className="no-dm-allowed dark-blue-1 flex-col">
          <FCDMPermissionFlagsDisplay />
        </div>
      )}

      <div className="flex-row flex-align-center">
        <div className="collapsable-actions">
          <input
            multiple={true}
            type="file"
            accept="image/png, image/jpeg, image/webp, image/gif, video/*, audio/*"
            style={{ display: 'none' }}
          />

          {collapsed ? (
            <div className="show-actions" onClick={() => setCollapsed(false)}>
              <i className="fa-light fa-chevron-right"></i>
            </div>
          ) : (
            <div className="actions">
              <div
                className="input-addon dark-blue-1 blue-1-hover-only pointer margin-right-2"
                onClick={showTipModal}
              >
                <i className="fal fa-badge-dollar hover-effect"></i>
              </div>

              <Dropdown
                className="input-addon transparent-dropdown margin-right-2"
                open={open}
              >
                <div
                  className="dropdown-title blue-1-hover-only"
                  ref={trigger}
                  onClick={() => setOpen(!open)}
                >
                  <i className="fal fa-image hover-effect"></i>
                </div>
                <div className="dropdown-list top left" ref={target}>
                  <div className="dropdown-item">
                    <i className="fa-fw fal fa-upload"></i>
                    <LocalizationString>Upload New</LocalizationString>
                  </div>
                  <div className="dropdown-item">
                    <i className="fa-fw fal fa-photo-film"></i>
                    <LocalizationString>From Vault</LocalizationString>
                  </div>
                </div>
              </Dropdown>
              {/* <div
              data-dropdownid="group-message-input-tenor-browser"
              className="input-addon transparent-dropdown margin-right-3"
            >
              <div className="dropdown-title blue-1-hover-only">
                <i className="fal fa-gif hover-effect"></i>
              </div>
            </div> */}
              {/* <div className="input-addon dark-blue-1 blue-1-hover-only pointer margin-right-3">
              <i className="fal fa-microphone hover-effect"></i>
            </div> */}
              <div className="input-addon dark-blue-1 blue-1-hover-only pointer margin-right-2">
                <i className="fal fa-trash hover-effect"></i>
              </div>
            </div>
          )}
        </div>
        <div className="message-input-container">
          <textarea
            rows={1}
            required={true}
            className="message-input ng-untouched ng-pristine ng-invalid"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key.length == 1) setCollapsed(true)
              if (e.key == 'Enter' && !e.ctrlKey && !e.shiftKey) {
                e.preventDefault()
                sendText()
              }
            }}
            style={{ height: textLineCount * 19 }}
          ></textarea>
          {text == '' && (
            <div className="label">Message @{account.userName}</div>
          )}
        </div>
        <FCButton className={`send-button ${canSend ? 'can-send' : ''}`}>
          <i className="fa-solid fa-paper-plane-top"></i>
        </FCButton>
      </div>

      <div className="error-container flex-row flex-justify-end margin-top-text"></div>
    </div>
  )
}
