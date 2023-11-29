import { mockLists } from '@/mock/lists'
import LocalizationString from '../common/LocalizationString'
import FCList from '../pages/lists/FCList'
import { useState } from 'react'
import { useModalMeta } from '@/contexts/modal'

type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function FCListAddAccountModal({
  children,
  className = '',
  ...rest
}: Props) {
  const mockData = mockLists.slice(3)
  const [lists, setLists] = useState(mockData)
  const [selection, setSelection] = useState<boolean[]>(
    Array(mockData.length).fill(false),
  )
  const { pop, push } = useModalMeta()

  const toggleSelection = (index: number) => () => {
    setSelection(selection.map((v, i) => (i == index ? !v : v)))
  }

  const save = () => {
    pop()
  }

  const addList = () => {
    push({ id: 'createlist', data: {} })
  }

  return (
    <div className={`fc-list-add-account-modal ${className}`} {...rest}>
      <div className="modal">
        <div className="modal-header">
          <div className="title">
            <LocalizationString>Select a List</LocalizationString>
          </div>
          <div className="actions" onClick={pop}>
            <i className="fa-fw fa fa-xmark pointer blue-1-hover-only hover-effect"></i>
          </div>
        </div>
        <div className="modal-content margin-top-1">
          <div className="flex-row border-bottom-1 padding-bottom-2 padding-top-1 font-size-sm">
            <div className="bold flex-1">
              <LocalizationString>My lists</LocalizationString>
            </div>
            <div onClick={addList}>
              <i className="fa-fw fa fa-plus pointer blue-1-hover-only"></i>
            </div>
          </div>

          <div>
            {lists.map((list, i) => (
              <FCList
                key={i}
                data={list}
                selected={selection[i]}
                hideMenu
                onClick={toggleSelection(i)}
              />
            ))}
          </div>
        </div>
        <div className="modal-footer margin-top-2">
          <div className="btn outline-blue" onClick={save}>
            <LocalizationString>Save</LocalizationString>
          </div>
        </div>
      </div>
    </div>
  )
}
