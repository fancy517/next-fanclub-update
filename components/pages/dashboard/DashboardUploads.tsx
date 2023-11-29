import LocalizationString from '@/components/common/LocalizationString'
import { useState } from 'react'

type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function DashboardUploads({
  children,
  className = '',
  ...rest
}: Props) {
  const [watermark, setWatermark] = useState('')

  return (
    <div className={`dashboard-uploads ${className}`} {...rest}>
      <div className="flex-col">
        <div className="display-name bold">Chage Watermark</div>
        <div className="description">
          Change the watermark that is displayed on the bottom right of your
          media. Leave the input empty to clear the watermark
        </div>
        <div className="material-input">
          <input
            type="text"
            required
            value={watermark}
            onChange={(e) => setWatermark(e.target.value)}
          />
          <div className="label">
            <LocalizationString>Media Watermark</LocalizationString>
          </div>
          <div className="placeholder">
            <LocalizationString>Enter Watermark</LocalizationString>
          </div>
        </div>
      </div>
    </div>
  )
}
