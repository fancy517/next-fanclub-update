import classNames from 'classnames'
import LocalizationString from '../LocalizationString'
import FCButtonNew from '../button/FCButtonNew'
import XDCheckbox from '../xd/XDCheckbox'
import { useRef, useState } from 'react'
import useOutsideClick from '@/hooks/useOutsideClick'
import Dropdown from '../dropdown'
import FCMediaUploadInput from './FCMediaUploadInput'
import { useModalMeta } from '@/contexts/modal'

type Props = {
  children?: React.ReactNode
  className?: string
  onSelect: (id: number) => void
  selected: number
  [x: string]: any
}

export default function MediaVaultContent({
  children,
  className = '',
  onSelect,
  selected,
  ...rest
}: Props) {
  const [showActions, setShowActions] = useState(false)
  const [showFilter, setShowFilter] = useState(false)
  const [showUploadInput, setShowUploadInput] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const actionButton = useRef(null)
  const actionMenu = useRef(null)
  const filterButton = useRef(null)
  const filterMenu = useRef(null)
  useOutsideClick(actionButton, actionMenu, () => setShowActions(false))
  useOutsideClick(filterButton, filterMenu, () => setShowFilter(false))

  const toggleUploadInput = () => setShowUploadInput(!showUploadInput)
  const toggleSearch = () => setShowSearch(!showSearch)
  const toggleFilter = () => setShowFilter(!showFilter)
  const goBack = () => onSelect(-1)

  // local params
  const [filterImage, setFilterImage] = useState(true)
  const [filterVideo, setFilterVideo] = useState(true)
  const [filterDate, setFilterDate] = useState<Date | null>(null)
  const toggleFilterImage = () => setFilterImage(!filterImage)
  const toggleFilterVideo = () => setFilterVideo(!filterVideo)

  const { push } = useModalMeta()
  const showDatepicker = () =>
    push({ id: 'datepicker', data: { cb: updateFilterDate } })
  const updateFilterDate = (d: Date) => setFilterDate(d)
  const clearFilterDate = (e: React.MouseEvent) => {
    e.stopPropagation()
    setFilterDate(null)
  }

  // callbacks
  const removeFromVault = () => {}

  return (
    <>
      <div className="flex-row vault-header">
        <div className="flex-row flex-align-center margin-top-1">
          <div className="bubble" onClick={goBack}>
            <i className="fal fa-arrow-left"></i>
          </div>
          <div className="font-size-xl semi-bold flex-row">All</div>
        </div>
        <div className="flex-1"></div>
        <div className="vault-search margin-top-1">
          <div
            className={classNames('bubble', { active: showSearch })}
            onClick={toggleSearch}
          >
            <i className="fa-light fa-search"></i>
          </div>
        </div>
        <div className="vault-filters margin-top-1">
          <Dropdown className="transparent-dropdown" open={showFilter}>
            <div className="bubble" ref={filterButton} onClick={toggleFilter}>
              <i className="fa-light fa-fw fa-filter-list"></i>
            </div>
            <div className="dropdown-list font-size-sm" ref={filterMenu}>
              <div className="dropdown-item" onClick={showDatepicker}>
                {filterDate ? (
                  <>
                    <i className="fa-light fa-calendar-days"></i>
                    {filterDate.toDateString()}
                    <i
                      className="clear-date-trash fa-fw fal fa-trash-can red-1 pointer"
                      onClick={clearFilterDate}
                    ></i>
                  </>
                ) : (
                  <>
                    <i className="fa-light fa-calendar-days"></i> Date
                  </>
                )}
              </div>
              <div className="dropdown-item" onClick={toggleFilterImage}>
                <XDCheckbox selected={filterImage} /> Images
              </div>
              <div className="dropdown-item" onClick={toggleFilterVideo}>
                <XDCheckbox selected={filterVideo} /> Videos
              </div>
            </div>
          </Dropdown>
        </div>
        <div className="vault-actions margin-top-1">
          <Dropdown className="transparent-dropdown" open={showActions}>
            <div
              className="bubble"
              ref={actionButton}
              onClick={() => setShowActions(!showActions)}
            >
              <LocalizationString>Actions</LocalizationString>
            </div>
            <div className="dropdown-list font-size-sm" ref={actionMenu}>
              <div className="dropdown-item">
                <i className="fa-fw fal fa-object-ungroup"></i>
                <LocalizationString>Select All</LocalizationString>
              </div>
              <div className="dropdown-item">
                <i className="fa-fw fal fa-plus"></i>
                <LocalizationString>Add Selected to Album</LocalizationString>
              </div>
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
                cb={removeFromVault}
              />
            </div>
          </Dropdown>
        </div>
      </div>

      {/* quick menu */}
      <div className="flex-row quick-menu">
        <div className="bubble" onClick={goBack}>
          Overview
        </div>
        {['All', 'Posts', 'Messages'].map((al, i) => (
          <div
            className={classNames('bubble', { active: i == selected })}
            onClick={() => onSelect(i)}
            key={i}
          >
            {al}
          </div>
        ))}
      </div>

      {showSearch ? (
        <div>
          <div className="material-input margin-top-1 icon-right">
            <input
              type="text"
              required
              className="ng-untouched ng-pristine ng-invalid"
            />
            <div className="icon-right pointer" onClick={toggleSearch}>
              <i className="fal fa-xmark blue-1-hover-only"></i>
            </div>
            <div className="label">
              <LocalizationString>Search Album</LocalizationString>
            </div>
            <div className="placeholder">
              <LocalizationString>Enter Filename</LocalizationString>
            </div>
          </div>
        </div>
      ) : showUploadInput ? (
        <>
          <FCMediaUploadInput className="margin-top-1 margin-bottom-1" />
          <div
            className="close-toggle blue-1-hover-only"
            onClick={toggleUploadInput}
          >
            <i className="fa-fw fal fa-chevrons-up"></i>
          </div>
        </>
      ) : (
        <div
          className="close-toggle blue-1-hover-only margin-top-1"
          onClick={toggleUploadInput}
        >
          <i className="fal fa-upload margin-right-text"></i> Upload to Vault
        </div>
      )}

      <div className="vault-wrapper margin-top-2">
        <div className="vault-content">
          <div className="spacer" style={{ height: 0 }}></div>
          <div className="spacer" style={{ height: 0 }}></div>
        </div>
      </div>
    </>
  )
}
