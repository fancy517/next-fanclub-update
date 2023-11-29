import { TAccount } from '@/types/account'
import FCAccountAvatar from '../common/account/FCAccountAvatar'
import LocalizationString from '../common/LocalizationString'
import { useState, useRef, useEffect } from 'react'
import { useModalMeta } from '@/contexts/modal'
import XDCheckbox from '../common/xd/XDCheckbox'
import FCPermissionFlagsEditor from '../common/editor/FCPermissionFlagsEditor'
import classNames from 'classnames'
import FCButton from '../common/button/FCButton'
import Dropdown from '../common/dropdown'
import FCAccountMediaTemplate from '../common/media/FCAccountMediaTemplate'
import '@/styles/modals/post_creation.scss'
import useOutsideClick from '@/hooks/useOutsideClick'
import { AuthContext, useAuth } from '@/contexts/auth'
import { toast } from 'react-toastify'
import { redirect } from 'next/navigation'
import { TPost } from '@/types/media'

type Props = {
  children?: React.ReactNode
  className?: string
  account: TAccount
  displayMode?: 1 | 2 | 3 | 4 | 5
  // 2 is for reply post
  // 5 is for update post
  postdata?: TPost
  parentid?: string
  [x: string]: any
}

type TPermission = 'Add New' | 'From Vault'

export default function FCPostCreation({
  children,
  className = '',
  account,
  displayMode = 1,
  postdata,
  parentid,
  ...rest
}: Props) {



  const { pop, push } = useModalMeta()
  const [message, setMessage] = useState('')
  const [pin, setPin] = useState(false)
  const [publicationDate, setPublicationDate] = useState<Date | null>(null)
  const [disappearDate, setDisappearDate] = useState<Date | null>(null)
  // const [formData, setFormData] = useState<FormData | null>(null)
  const [fileUrls, setFileUrls] = useState<string[]>([])
  const [files, setFiles] = useState<File[]>([])
  const [fileids, setFileids] = useState<string[]>([])
  const [tags, setTags] = useState<Array<string[]>>([])
  const [open, setOpen] = useState(false)
  const button = useRef(null)
  const menu1 = useRef(null)
  const [reload, setReload] = useState(false)
  useEffect(() => {
    if (!postdata) return
    setMessage(postdata.description)

    const pub_date = new Date(postdata.publish_date ? postdata.publish_date : new Date())
    if (pub_date > new Date())
      setPublicationDate(pub_date > new Date() ? pub_date : null)
    const dis_date = new Date(postdata.disappear_date ? postdata.disappear_date : new Date())
    if (dis_date > new Date())
      setPublicationDate(dis_date > new Date() ? dis_date : null)

    setPin(postdata.is_pinned === "0" ? false : true)
    const _fileurls: string[] = []
    const _fileids: string[] = []
    postdata.Attachment.Medias.map(fileurl => {
      _fileurls.push(`${process.env.NEXT_PUBLIC_SERVER_URL}/public/` + fileurl.sourceid)
      _fileids.push(fileurl.id)
    })
    setFileUrls(_fileurls)
    setFileids(_fileids)
    console.log(_fileids)
  }, [])

  useOutsideClick(button, menu1, () => setOpen(false))

  const removeFile = (index: number) => () => {
    setFileUrls(fileUrls.filter((_, i) => i !== index))
    if (index < fileids.length)
      setFileids(fileids.filter((_, i) => i !== index))
    else {
      const sid = index - fileids.length
      setFiles(files.filter((_, i) => i !== sid))
      setTags(tags.filter((_, i) => i !== sid))
    }
  }

  const togglePin = () => setPin(!pin)
  const showUploadMedia = () => {
    push({
      id: 'accountmediaupload',
      data: {
        mode: 2,
        formdata: null,
        cb: (files1: File[], tags1: string[]) => {
          // setFiles(files)

          const _fileUrls = fileUrls
          const _files = files
          const _tags = tags

          for (var file of files1 || []) {
            _fileUrls.push(URL.createObjectURL(file))
            _files.push(file)
            _tags.push(tags1)
          }
          console.log("tags: ", _tags)
          setFileUrls([..._fileUrls])
          console.log(fileUrls)
          setFiles([..._files])
          setTags([..._tags])
        },
      },
    })
  }
  const showDatepicker1 = () =>
    push({
      id: 'datepicker',
      data: {
        current: publicationDate,
        cb: (date: Date) => setPublicationDate(date),
      },
    })
  const showDatepicker2 = () =>
    push({
      id: 'datepicker',
      data: {
        current: disappearDate,
        cb: (date: Date) => setDisappearDate(date),
      },
    })

  const authData = useAuth()
  const embedded = displayMode == 3 || displayMode == 4

  const post = async () => {

    var formData = new FormData()
    formData.append('postid', postdata?.id || '-1')

    if (displayMode == 2 || displayMode == 3)
      formData.append('parentid', parentid || '0')
    else formData.append('parentid', '0')
    formData.append('username', authData.user?.userName || '')
    files.forEach((file) => {
      formData.append('files', file)
    })
    tags.forEach((tag) => {
      formData.append('tags', tag.join(','))
    })
    formData.append('message', message)
    formData.append('is_pinned', pin === true ? '1' : '0')
    formData.append('reply_role', '')
    fileids.forEach((fileid) => {
      formData.append('fileids', fileid)
      console.log('111111-----', fileid)
    })
    formData.append(
      'publish_date',
      publicationDate?.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }) || new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    )
    formData.append(
      'disappear_date',
      disappearDate?.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }) || '',
    )
    try {
      console.log(formData)
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/creator/post`, {
        method: 'POST',
        body: formData,
      })
      const msg = await response.json()
      if (msg === 'success') {
        pop()
        toast.success('Your post has been created')
        const timer = setTimeout(() => {
          // Code to be executed after the specified time
          window.location.reload()
          // redirect('/asdf/post')
        }, 2000);
      }
      else if (msg === "updated") {
        pop()
        toast.success('Your post has been updated')
        const timer = setTimeout(() => {
          // Code to be executed after the specified time
          window.location.reload()
        }, 2000);
      }
      else {
        toast.error('Post Failed')
      }
    } catch (error) {
      toast.error('An error occurred')
      console.error('Error uploading files:', error)
    }
  }

  const showMediaVaultModal = () => push({ id: 'mediavaultpicker', data: '' })

  return (
    <div className={`fc-post-creation ${className}`} {...rest}>
      <div className={`new-post-header ${displayMode == 4 && 'slim'}`}>
        {(displayMode < 4 || displayMode == 5) && (
          <div className="new-post-creator-avatar">
            <FCAccountAvatar className="avatar" account={account} />
          </div>
        )}
        <div className="new-post-content">
          {publicationDate && displayMode != 2 && (
            <div className="flex-row schedule-post">
              <i className="fa-fw fal fa-calendar"></i>
              <LocalizationString className="margin-right-text">
                Will publish on
              </LocalizationString>{' '}
              {publicationDate.toDateString()}
              <div
                className="margin-left-1 dark-blue-1 red-1-hover-only pointer"
                onClick={() => setPublicationDate(null)}
              >
                <i className="fa-fw fal fa-trash"></i>
              </div>
            </div>
          )}

          {disappearDate && displayMode != 2 && (
            <div className="flex-row schedule-post">
              <i className="fa-fw fal fa-calendar"></i>
              <LocalizationString className="margin-right-text">
                Will expire on
              </LocalizationString>{' '}
              {disappearDate.toDateString()}
              <div
                className="margin-left-1 dark-blue-1 red-1-hover-only pointer"
                onClick={() => setDisappearDate(null)}
              >
                <i className="fa-fw fal fa-trash"></i>
              </div>
            </div>
          )}

          {/* {displayMode == 1 && (
            <div className="flex-row for-you-info dark-blue-1">
              <i className="fa-fw fal fa-magnifying-glass"></i>No FYP Promotion
              (click to learn more){' '}
            </div>
          )} */}

          {(displayMode < 4 || displayMode == 5) && (
            <div className="material-input">
              <textarea
                rows={4}
                required={true}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="ng-touched ng-dirty ng-valid"
              ></textarea>

              <div className="label">
                <LocalizationString>
                  {displayMode == 3
                    ? 'Type your reply...'
                    : 'Type a message...'}
                </LocalizationString>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex-col post-options">
        {(displayMode == 1 || displayMode == 5) && (
          <>
            <div
              className="flex-row margin-bottom-1 pointer noselect flex-align-center padding-left-3"
              onClick={togglePin}
            >
              <XDCheckbox selected={pin} className="margin-right-text" /> Pin to
              Timeline
            </div>

            <div className="reply-permission padding-left-3">
              <div className="reply-permission-description dark-blue-1 font-size-sm">
                Control who can reply to this Post:
              </div>
              <div className="reply-permission-editor">
                <FCPermissionFlagsEditor data={{ _permission: [] }} />
              </div>
            </div>
            {files && (
              <div
                className={'m-media-wrapper'}
                style={{ display: 'flex', overflowX: 'auto', width: '97%' }}
              >
                {fileUrls.map((fileUrl, i) => (
                  <FCAccountMediaTemplate
                    key={i}
                    className="media-container hover-border selected"
                    source={fileUrl}
                    style={{
                      minWidth: '40%',
                      height: '130px',
                      margin: '5px',
                      padding: '5px',
                      border: '2px solid var(--blue-1)',
                      borderRadius: '8px',
                    }}
                    onRemove={removeFile(i)}
                  />
                ))}
              </div>
            )}
          </>
        )}
        {(displayMode == 2) && (
          <>
            {files && (
              <div
                className={'m-media-wrapper'}
                style={{ display: 'flex', overflowX: 'auto', width: '97%' }}
              >
                {fileUrls.map((fileUrl, i) => (
                  <FCAccountMediaTemplate
                    key={i}
                    className="media-container hover-border selected"
                    source={fileUrl}
                    style={{
                      minWidth: '40%',
                      height: '130px',
                      margin: '5px',
                      padding: '5px',
                      border: '2px solid var(--blue-1)',
                      borderRadius: '8px',
                    }}
                    onRemove={removeFile(i)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
      <div
        className={classNames(
          'new-post-footer alternative border-color',
          {
            'embedded-reply': embedded,
          },
          { slim: displayMode == 4 },
        )}
      >
        {(displayMode < 4 || displayMode == 5) && (
          <>
            <div className="emojis" /* onClick={showUploadMedia} */>
              {/* {displayMode == 1 && (
                <i className="fa-fw fal fa-image hover-effect blue-1"></i>
              )} */}
              <Dropdown
                className="flex-row flex-wrap flex-align-center permission-flag new-flag pointer"
                open={open}
                onClick={() => setOpen(!open)}
              >
                <div ref={button}>
                  <i className="fa-fw fal fa-image hover-effect blue-1"></i>
                </div>

                <div
                  className="dropdown-list"
                  style={{
                    fontSize: '15px',
                    border: '2px solid',
                    left: 'unset',
                    top: 'unset',
                    bottom: '3em',
                  }}
                  ref={menu1}
                >
                  <div className="dropdown-item" onClick={showUploadMedia}>
                    Add New
                  </div>
                  <div className="dropdown-item" onClick={showMediaVaultModal}>
                    From Vault
                  </div>
                </div>
              </Dropdown>
            </div>
            {displayMode != 2 && displayMode != 3 && (
              <div className="emojis" onClick={showDatepicker1}>
                <div className="icon-stack">
                  <i className="fa-fw fal fa-calendar hover-effect blue-1"></i>
                  <i className="fa-fw fal fa-clock overlay bottom right blue-1"></i>
                </div>
              </div>
            )}
            {displayMode != 2 && displayMode != 3 && (

              <div className="emojis" onClick={showDatepicker2}>
                <div className="icon-stack">
                  <i className="fa-fw fal fa-calendar hover-effect blue-1"></i>
                  <i className="fal fa-trash-can overlay bottom right blue-1"></i>
                </div>
              </div>
            )}
            <div className="flex-spacer"></div>
          </>
        )}

        {displayMode == 1 && (
          <div className="btn new-post-btn solid-blue" onClick={post}>
            <LocalizationString>Post</LocalizationString>
          </div>
        )}
        {displayMode == 2 && (
          <div className="btn new-post-btn solid-blue" onClick={post}>
            <LocalizationString>Reply</LocalizationString>
          </div>
        )}
        {displayMode == 3 && (
          <div className="btn new-post-btn solid-blue" onClick={post} >
            <LocalizationString>Reply</LocalizationString>
          </div>
        )}
        {displayMode == 5 && (
          <div className="btn new-post-btn solid-blue" onClick={post} >
            <LocalizationString>Change</LocalizationString>
          </div>
        )

        }
        {displayMode == 4 && (
          <div className="collapsable-actions">
            <div className="actions">
              <div className="emojis actions"></div>
            </div>
          </div>
        )}
        {displayMode == 4 && (
          <div className="message-input-container">
            <textarea
              rows={1}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="message-input ng-untouched ng-pristine ng-invalid"
            ></textarea>
            {message == '' && (
              <div className="label">
                <LocalizationString>Type your reply...</LocalizationString>
              </div>
            )}
          </div>
        )}
        {displayMode == 4 && (
          <FCButton className="send-button can-send">
            <i className="fa-solid fa-paper-plane-top"></i>
          </FCButton>
        )}
      </div>
      <div className="error-container flex-row flex-justify-end margin-top-text"></div>
    </div>
  )
}
