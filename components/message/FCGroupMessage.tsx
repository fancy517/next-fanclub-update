import { useRef, useState } from 'react'
import Dropdown from '../common/dropdown'
import FCGroupMessageAttachment from './FCGroupMessageAttachment'
import useOutsideClick from '@/hooks/useOutsideClick'

type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

const dummyText =
  "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."

const emojis = [
  'cry-laugh',
  'surprised',
  'sad',
  'heart',
  'fire',
  'thumbs-up',
  'thumbs-down',
]

export default function FCGroupMessage({
  children,
  className = '',
  onReply,
  ...rest
}: Props) {
  const [showEmoji, setShowEmoji] = useState(false)
  const button = useRef(null)
  const menu = useRef(null)
  useOutsideClick(button, menu, () => setShowEmoji(false))

  const [emos, setEmos] = useState<number[]>([])
  const addEmoji = (emoid: number) => () => {
    if (emos.findIndex((v) => emoid == v) == -1) {
      setEmos([emoid, ...emos])
    }
  }
  const deleteEmoji = (emoid: number) => () => {
    setEmos(emos.filter((v) => v != emoid))
  }

  return (
    <div className={`fc-group-message ${className}`} {...rest}>
      <div className="message-reply-wrapper">
        <div className="message-wrapper">
          {/* message */}
          <div className="message">
            <div className="message-attachment">
              <FCGroupMessageAttachment className="attachment auto-size" />
            </div>

            <div className="message-text">{dummyText}</div>
          </div>

          {/* message actions */}
          <div className="actions flex-row">
            <div
              className="blue-1-hover-only pointer hover-visible margin-right-1"
              onClick={() => onReply('986516516')}
            >
              <i className="fal fa-reply"></i>
            </div>
            <Dropdown
              className="transparent-dropdown hover-visible margin-right-2"
              open={showEmoji}
            >
              <div
                className="icon-stack font-size-xl blue-1-hover-only pointer"
                onClick={() => setShowEmoji(!showEmoji)}
                ref={button}
              >
                <i className="fa-fw fal fa-heart"></i>
                <i className="fa-fw fal fa-plus overlay bottom right"></i>
              </div>
              <div className="tooltip-list top" ref={menu}>
                {emojis.map((emo, i) => (
                  <div className="tooltip-item" key={emo} onClick={addEmoji(i)}>
                    <div className={`emoji ${emo}`}></div>
                  </div>
                ))}
              </div>
            </Dropdown>
          </div>
        </div>

        <div className="tap-backs">
          {emos.map((emo, i) => (
            <div className="liked-type liked" key={i}>
              <i
                className="fa-fw fa fa-trash-can red-1 unlike-icon"
                onClick={deleteEmoji(emo)}
              ></i>
              <div className={`emoji ${emojis[emo]}`}></div> 1
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
