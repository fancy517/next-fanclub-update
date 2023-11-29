import '@/styles/modals/account_media_upload.scss'
import LocalizationString from '../common/LocalizationString'
import FCAccountMediaTemplate from '../common/media/FCAccountMediaTemplate'
import Dropdown from '../common/dropdown'
import { useContext, useRef, useState } from 'react'
import useOutsideClick from '@/hooks/useOutsideClick'
import { useModalMeta } from '@/contexts/modal'
import { fileToDataUri } from '@/utils/helpers'
import FCPermissionFlagsEditor from '../common/editor/FCPermissionFlagsEditor'
import { cookies } from 'next/headers'
import { AuthContext, useAuth } from '@/contexts/auth'
type Props = {
  children?: React.ReactNode
  className?: string
  data: {
    mode: number
    files: File[]
    cb: (files: File[], tags: string[]) => void
  }
  [x: string]: any
}

export default function FCAccountMediaUpload({
  children,
  className = '',
  data,
  ...rest
}: Props) {
  const [open, setOpen] = useState(false)
  const button = useRef(null)
  const menu = useRef(null)
  const { mode } = data
  const { cb } = data
  const [tags, setTags] = useState<string[]>([])
  const fileEle = useRef<HTMLInputElement | null>(null)
  useOutsideClick(button, menu, () => setOpen(false))

  // local prams
  const [files, setFiles] = useState<File[]>([])
  const [fileUrls, setFileUrls] = useState<string[]>([])

  const { push, pop } = useModalMeta()
  const showMediaVaultModal = () => push({ id: 'mediavaultpicker', data: '' })

  const closeModal = () => pop()

  const onUploadNew = () => {
    fileEle.current?.click()
  }

  const uploadFiles = () => {
    cb(files, tags)
    pop()
  }
  const removeTag = (index: number) => () =>
    setTags(tags.filter((_, i) => i != index))

  const onFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files || e.currentTarget.files.length == 0) {
      return
    }

    setFileUrls([...fileUrls, URL.createObjectURL(e.currentTarget.files[0])])
    setFiles([...files, e.currentTarget.files[0]])
  }
  const removeFile = (index: number) => () => {
    setFileUrls(fileUrls.filter((_, i) => i !== index))
    setFiles(files.filter((_, i) => i !== index))
  }

  const showTagModal = () =>
    push({ id: 'mediatag', data: { tags, cb: (t: string[]) => setTags(t.sort()) } })

  return (
    <div className={`fc-account-media-upload ${className}`} {...rest}>
      <div className="modal">
        <div className="modal-header">
          <div className="title">
            <LocalizationString>Upload media</LocalizationString>
          </div>
          <div className="actions" onClick={closeModal}>
            <i className="fa-fw fa fa-xmark pointer blue-1-hover-only hover-effect"></i>
          </div>
        </div>
        <div className="modal-content">
          <div className="media-wrapper-container">
            <div className="media-wrapper">
              {fileUrls.map((fileUrl, i) => (
                <div className="media-container-wrapper" key={i}>
                  <FCAccountMediaTemplate
                    className="media-container hover-border selected"
                    source={fileUrl}
                    onRemove={removeFile(i)}
                  />
                </div>
              ))}

              <div
                className="media-container-wrapper xd-drag-ignore"
                onClick={onUploadNew}
                ref={button}
              >
                <Dropdown className="media-container add-more" open={open}>
                  <div className="dropdown-title">
                    <i className="fa-fw fal fa-plus"></i>
                  </div>
                  <div className="dropdown-list center" ref={menu}>
                    <div className="dropdown-item" onClick={onUploadNew}>
                      <i className="fa-fw fal fa-upload"></i>
                      <LocalizationString>Upload New</LocalizationString>
                    </div>
                    <div
                      className="dropdown-item"
                      onClick={showMediaVaultModal}
                    >
                      <i className="fal fa-photo-film"></i>
                      <LocalizationString>From Vault</LocalizationString>
                    </div>
                  </div>
                </Dropdown>
              </div>
              <div className="media-container-wrapper" xd-dragable-id="1"></div>
            </div>
          </div>

          {mode == 2 && (
            <div className="media-permission-container margin-top-3">
              <div className="container-title">Media Permissions</div>
              <div className="container-description">
                <LocalizationString>
                  The following permissions decide who can see your media. You
                  can create multiple sets of permissions to fine tune the
                  access permission.
                </LocalizationString>
              </div>

              <FCPermissionFlagsEditor data={{_permission:[]}} />

              <div className="tag-container" style={{display:'flex', margin: '10px', flexWrap: 'wrap'}}>
                {tags.map((tag, i) => (
                  <div key={i} className="btn" onClick={removeTag(i)} style={{margin: '5px'}}>
                    #{tag}
                  </div>
                ))}
              </div>
              <div className="btn margin-bottom-2" onClick={showTagModal}>
                Tag Media
              </div>
            </div>
          )}
        </div>
        <div className="modal-footer flex-col">
          <div className="flex-row">
            <div className="flex-1"></div>
          </div>
          <div className="flex-row">
            <div className="flex-1"></div>
            <div className="btn large margin-right-2" onClick={closeModal}>
              <LocalizationString>Cancel</LocalizationString>
            </div>
            <div className="btn solid-blue large" onClick={uploadFiles}>
              <LocalizationString>Upload</LocalizationString>
            </div>
          </div>
        </div>
        <input
          type="file"
          accept="image/png, image/jpeg, image/webp, image/gif, video/*, audio/*"
          onChange={onFileSelected}
          ref={fileEle}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  )
}
