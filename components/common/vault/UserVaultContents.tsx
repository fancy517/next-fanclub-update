'use client'

import { TAlbum } from '@/types'
import LocalizationString from '../LocalizationString'
import FCButtonNew from '../button/FCButtonNew'
import { useRef, useState } from 'react'
import { mockMedias } from '@/mock/medias'
import Dropdown from '../dropdown'
import useOutsideClick from '@/hooks/useOutsideClick'
import { useModalMeta } from '@/contexts/modal'
import RenderContainer from './RenderContainer'
import classNames from 'classnames'

type Props = {
  children?: React.ReactNode
  className?: string
  albums: Array<TAlbum>
  selectedId: number
  onBack: () => void
  onAlbumChange: (aid: number) => void
  [x: string]: any
}

export default function UserVaultContents({
  children,
  className,
  albums,
  selectedId,
  onBack,
  onAlbumChange,
  ...rest
}: Props) {
  // action button
  const [showActions, setShowActions] = useState(false)
  const actionButton = useRef(null)
  const actionMenu = useRef(null)
  const isPurchaseAlbum = selectedId == 0
  useOutsideClick(actionButton, actionMenu, () => setShowActions(false))

  // More button
  const [showMore, setShowMore] = useState(false)
  const moreButton = useRef(null)
  const moreMenu = useRef(null)
  useOutsideClick(moreButton, moreMenu, () => setShowMore(false))

  // modal
  const { push } = useModalMeta()
  const showEditModal = () =>
    push({
      id: 'uservaultalbumedit',
      data: { album: albums[selectedId], cb: () => {} },
    })
  const showDeleteModal = () =>
    push({
      id: 'uservaultalbumdelete',
      data: { album: albums[selectedId], cb: () => {} },
    })
  const showUploadModal = () =>
    push({ id: 'accountmediaupload', data: { mode: 1 } })

  const addSelectedToAlbum = () => {
    push({ id: 'uservaultalbumselect', data: '' })
  }

  const selectAll = () => {}

  return (
    <>
      <div className="flex-row vault-header">
        <div className="flex-row flex-align-center margin-top-1">
          <div className="bubble" onClick={onBack}>
            <i className="fal fa-arrow-left"></i>
          </div>
          <div className="font-size-xl semi-bold flex-row">
            {albums[selectedId].name}
          </div>
        </div>
        <div className="flex-1"></div>
        <div className="vault-actions margin-top-1">
          <Dropdown className="transparent-dropdown" open={showActions}>
            <div
              className="bubble"
              onClick={() => setShowActions(!showActions)}
              ref={actionButton}
            >
              <LocalizationString>Actions</LocalizationString>
            </div>
            <div className="dropdown-list font-size-sm" ref={actionMenu}>
              {!isPurchaseAlbum && (
                <div className="dropdown-item" onClick={showUploadModal}>
                  <i className="fa-fw fal fa-upload"></i>
                  <LocalizationString>Upload Media</LocalizationString>
                </div>
              )}
              <div className="dropdown-item" onClick={selectAll}>
                <i className="fa-fw fal fa-object-ungroup"></i>
                <LocalizationString>Select All</LocalizationString>
              </div>
              <div className="dropdown-item" onClick={addSelectedToAlbum}>
                <i className="fa-fw fal fa-plus"></i>
                <LocalizationString>Add Selected to Album</LocalizationString>
              </div>
              {!isPurchaseAlbum && (
                <>
                  <FCButtonNew
                    buttonContent={
                      <div className="dropdown-item">
                        <i className="fa-fw fal fa-trash"></i>
                        <LocalizationString>
                          Remove Selected from Album
                        </LocalizationString>
                      </div>
                    }
                    confirmationContent={
                      <div className="flex-row margin-top-1">
                        Do you want to Remove Selected Media from Album?
                      </div>
                    }
                    cb={() => {}}
                  />
                  <div className="dropdown-item" onClick={showEditModal}>
                    <i className="fa-fw fal fa-pencil"></i> Edit Album Details
                  </div>
                  <div className="dropdown-item" onClick={showDeleteModal}>
                    <i className="fa-fw fal fa-trash"></i> Delete Album
                  </div>
                </>
              )}
            </div>
          </Dropdown>
        </div>
      </div>
      <div className="flex-row quick-menu">
        <div className="bubble" onClick={onBack}>
          Overview
        </div>
        {albums.slice(0, 2).map((album, i) => (
          <div
            key={i}
            onClick={() => onAlbumChange(i)}
            className={classNames('bubble size-limited', {
              active: i == selectedId,
            })}
          >
            {album.name}
          </div>
        ))}

        {albums.length > 2 && (
          <Dropdown className="transparent-dropdown" open={showMore}>
            <div
              className="bubble"
              onClick={() => setShowMore(!showMore)}
              ref={moreButton}
            >
              <i className="fa-fw fal fa-chevron-down margin-right-text"></i>
              <i className="fa-fw fal fa-chevron-up margin-right-text"></i>More
            </div>
            <div
              className="dropdown-list right bottom font-size-sm albums"
              ref={moreMenu}
            >
              {albums.slice(2).map((album, i) => (
                <div
                  className="dropdown-item flex-row"
                  key={i}
                  onClick={() => onAlbumChange(i + 2)}
                >
                  <div className="eclipse display-block">{album.name}</div>
                  {/* <i className="fa fa-pencil blue-1-hover-only margin-left-2 close-btn"></i> */}
                  {/* <i className="fa fa-xmark blue-1-hover-only margin-left-2 close-btn"></i> */}
                </div>
              ))}
            </div>
          </Dropdown>
        )}
      </div>

      <div className="vault-wrapper margin-top-2">
        <div className="vault-content">
          <div className="spacer" style={{ height: 0 }}></div>
          {[3, 1, 2, 4].map((v, i) => (
            <div className="vault-row" key={i}>
              <div className="segmentation-container">7 August</div>
              {[1, 2, 3, 4, 5, 6].map((k, j) => (
                <RenderContainer media={mockMedias[1]} key={j} />
              ))}
            </div>
          ))}
          <div className="spacer" style={{ height: 0 }}></div>
        </div>

        {albums[selectedId].count == 0 && (
          <div className="vault-content">
            <div className="flex-row flex-center margin-top-4 dark-blue-1 text-center">
              <i className="fa-light fa-image-slash fa-2x dark-blue-1"></i>
            </div>
            <div className="flex-row flex-center margin-top-4 dark-blue-1 text-center font-size-sm">
              This Album does not have any Media yet, upload new content by
              clicking on actions or go to your existing posts and add content
              via the Bookmark function.
            </div>
          </div>
        )}
      </div>
    </>
  )
}
