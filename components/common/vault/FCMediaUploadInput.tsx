import { useRef, useState } from 'react'
import FCAccountMediaCreateTemplate from '../media/FCAccountMediaCreateTemplate'

type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function FCMediaUploadInput({
  children,
  className = '',
  ...rest
}: Props) {
  const fileElement = useRef<HTMLInputElement | null>(null)
  const [fileUrls, setFileUrls] = useState<string[]>([])

  const emptyWrapperCount = (3 - ((fileUrls.length + 1) % 3)) % 3

  const openFileDialog = () => {
    fileElement.current?.click()
  }
  const onFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files || e.currentTarget.files.length == 0) {
      return
    }
    setFileUrls([...fileUrls, URL.createObjectURL(e.currentTarget.files[0])])
  }
  const removeUploadingFile = (i: number) => () => {
    setFileUrls(fileUrls.filter((_, idx) => i != idx))
  }

  return (
    <div className={`fc-media-upload-input ${className}`} {...rest}>
      <div className="media-wrapper-container">
        <div className="media-wrapper">
          {fileUrls.map((v, i) => (
            <div className="media-container-wrapper" key={i}>
              <FCAccountMediaCreateTemplate
                source={v}
                onCancel={removeUploadingFile(i)}
              />
            </div>
          ))}

          {/* add more */}
          <div className="media-container-wrapper">
            <div className="media-container add-more" onClick={openFileDialog}>
              <div className="dropdown-title">
                <i className="fa-fw fal fa-plus"></i>
              </div>
            </div>
          </div>

          {[...Array(emptyWrapperCount).keys()].map((_, i) => (
            <div className="media-container-wrapper" key={i}></div>
          ))}
        </div>
      </div>

      <input
        type="file"
        ref={fileElement}
        onChange={onFileSelected}
        accept="image/png, image/jpeg, image/webp, image/gif, video/*, audio/*"
        style={{ display: 'none' }}
      />
    </div>
  )
}
