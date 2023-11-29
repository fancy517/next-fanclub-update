import { Fragment, useEffect, useRef, useState } from 'react'
import LocalizationString from '../LocalizationString'
import FCTippedPermissionFlag from './FCTippedPermissionFlag'
import Dropdown from '../dropdown'
import useOutsideClick from '@/hooks/useOutsideClick'
import { TPermission, TPermissionArray } from '@/types/media'

type Props = {
  children?: React.ReactNode
  className?: string
  data: {
    _permission?: TPermissionArray[],
    cb?: (permission:TPermissionArray[]) => void
  }
  [x: string]: any
}



export default function FCPermissionFlagsEditor({
  children,
  className,
  data,
  ...rest
}: Props) {
  // const perm = 'f_s_1.6+f_s'
  const {_permission, cb} = data
  const [permission, setPermission] = useState<TPermissionArray[]>(_permission || [] )
  const changePermissionTerm = (p: TPermissionArray, index: number) =>
  setPermission(permission.map((v, i) => (i == index ? p : v)))
  
  const addNew = () => setPermission([...permission, []])
  const canAdd =
  permission.length == 0 || permission[permission.length - 1].length != 0
  
  useEffect(() => {
    _permission && _permission.length && setPermission(_permission)
  }, [_permission])
  useEffect(() => {
    permission.length && cb && cb(permission)
  }, [permission])
  return (
    <div className={`fc-permission-flags-editor ${className ?? ''}`} {...rest}>
      {permission.map((p, i) => (
        <div className="flex-col" key={i}>
          {i != 0 && (
            <div className="flex-row flex-center bold margin-1 blue-1">
              <span>
                <LocalizationString className="uppercase">
                  OR
                </LocalizationString>
              </span>
            </div>
          )}

          <PermissionFlagRow
            flags={p}
            onChange={(newPerm) => changePermissionTerm(newPerm, i)}
          />
        </div>
      ))}

      {canAdd && permission.length > 0 && (
        <div className="flex-row flex-center bold margin-1 blue-1">
          <span>
            <LocalizationString className="uppercase">OR</LocalizationString>
          </span>
        </div>
      )}

      {canAdd && (
        <div className="new-row flex-row form-look flex-align-center">
          <div
            className="flex-row flex-wrap flex-align-center permission-flag new-flag pointer"
            onClick={addNew}
          >
            <i className="fa-fw fas fa-plus margin-right-1"></i>
            <LocalizationString>Add New</LocalizationString>
          </div>
        </div>
      )}
    </div>
  )
}

const PermissionFlagRow = ({
  flags,
  onChange,
}: {
  flags: TPermissionArray
  onChange: (a: TPermissionArray) => void
}) => {
  const [open, setOpen] = useState(false)
  const button = useRef(null)
  const menu = useRef(null)
  useOutsideClick(button, menu, () => setOpen(false))

  const removeItem = (index: number) => () =>
    onChange(flags.filter((_, i) => i != index))
  const addItem = (flag: TPermission) => () => {
    const checkDup = (v: TPermission) =>
      v == flag || (typeof flag == 'number' && typeof v == 'number')
    if (flags.some(checkDup) == false) onChange([...flags, flag])
  }

  const editPrice = (flag: TPermission, index: number) =>
    onChange(flags.map((v, i) => (i != index ? v : flag)))

  return (
    <div className="flex-row form-look flex-align-center">
      {flags.map((flag, index) => (
        <Fragment key={index}>
          <PermissionFlag
            flag={flag}
            onRemove={removeItem(index)}
            onEditPrice={(f) => editPrice(f, index)}
          />
          <div className="bold font-size-lg blue-1 margin-left-text margin-right-text">
            &amp;
          </div>
        </Fragment>
      ))}

      <Dropdown
        className="flex-row flex-wrap flex-align-center permission-flag new-flag pointer"
        open={open}
        onClick={() => setOpen(!open)}
      >
        <div ref={button}>
          <LocalizationString>New permission</LocalizationString>
          <i className="fa-fw fas fa-caret-down margin-left-text"></i>
        </div>

        <div
          className="dropdown-list"
          ref={menu}
          style={{ fontSize: 'inherit' }}
        >
          <div className="dropdown-item" onClick={addItem('following')}>
            Following
          </div>
          <div className="dropdown-item" onClick={addItem('subscribed')}>
            Subscribed
          </div>
          <div className="dropdown-item" onClick={addItem(0.5)}>
            Tipped
          </div>
          <div className="dropdown-item" onClick={addItem('followed')}>
            Followed by Me
          </div>
        </div>
      </Dropdown>
    </div>
  )
}

const PermissionFlag = ({
  flag,
  onRemove,
  onEditPrice,
}: {
  flag: TPermission
  onRemove: () => void
  onEditPrice: (price: TPermission) => void
}) => {
  if (typeof flag === 'number') {
    return (
      <FCTippedPermissionFlag
        value={flag}
        onChange={(v) => onEditPrice(v)}
        onRemove={onRemove}
        className="flex-row flex-wrap flex-align-center permission-flag capitalize max-100"
      />
    )
  }

  return (
    <div className="flex-row flex-wrap flex-align-center permission-flag capitalize max-100">
      {flag == 'subscribed' && (
        <>
          <span className="margin-right-text">subscribed</span>
          <small> (All Tiers) </small>
        </>
      )}
      {flag == 'followed' && 'followed by me'}
      {flag == 'following' && 'following'}

      <i
        className="fa-fw fal fa-trash-can margin-left-text blue-1-hover-only pointer"
        onClick={onRemove}
      ></i>
    </div>
  )
}
