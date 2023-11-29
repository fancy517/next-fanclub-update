import { useState } from 'react'
import LocalizationString from '../common/LocalizationString'
import XDRadio from '../common/xd/XDRadio'
import { useModalMeta } from '@/contexts/modal'

type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

const data = [
  'This content is offensive or violates Fanclub Terms of Service',
  'This content contains stolen material (DMCA)',
  'This content is spam',
  'Report Abuse',
]

export default function FCReportContentModal({
  children,
  className = '',
  ...rest
}: Props) {
  const { pop } = useModalMeta()
  const [option, setOption] = useState(-1)

  const send = () => {
    pop()
  }

  return (
    <div className={`fc-report-content-modal ${className}`} {...rest}>
      <div className="modal-header">
        <LocalizationString>Report Content</LocalizationString>
      </div>
      <div className="modal-content flex-col">
        {data.map((v, i) => (
          <XDRadio
            key={i}
            selected={i == option}
            value={v}
            onClick={() => setOption(i)}
          />
        ))}
      </div>

      <div className="material-input">
        <textarea
          rows={4}
          required
          placeholder="Please provide additional information"
          className="ng-untouched ng-pristine ng-invalid"
        ></textarea>
      </div>

      <div className="modal-footer">
        <div className="flex-1"></div>
        <div className="btn large" onClick={pop}>
          <LocalizationString>Cancel</LocalizationString>
        </div>
        <div className="btn solid-blue large confirm-btn" onClick={send}>
          <LocalizationString>Confirm</LocalizationString>
        </div>
      </div>
    </div>
  )
}
