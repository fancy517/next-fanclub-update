import '@/styles/modals/list_create.scss'
import LocalizationString from '../common/LocalizationString'
import { useState } from 'react'
import { useModalMeta } from '@/contexts/modal'
import { useAuth } from '@/contexts/auth'
import { toast } from 'react-toastify'

type Props = {
  children?: React.ReactNode
  className?: string
  data: {
    cb: (name: string) => void
  }
  [x: string]: any
}

export default function FCListCreate({
  children,
  className = '',
  data,
  ...rest
}: Props) {
  const [name, setName] = useState('')

  const { pop } = useModalMeta()
  const closeModal = () => pop()
  const { cb } = data
  const { user } = useAuth()

  const save = async () => {
    if (!user) return
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/user/create_list?userid=${user.userID}&name=${name}`)
      const data = await response.json()
      if (data === "success") {
        cb && cb("success")
        pop()
      }
      else {
        toast.error("Failed to create")
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={`fc-list-create ${className}`} {...rest}>
      <div className="modal">
        <div className="modal-header">
          <div className="title">
            <LocalizationString>Create new list</LocalizationString>
          </div>
          <div className="actions" onClick={closeModal}>
            <i className="fa-fw fa fa-xmark pointer blue-1-hover-only hover-effect"></i>
          </div>
        </div>
        <div className="modal-content">
          <div className="material-input margin-top-1">
            <input
              type="text"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              className="ng-untouched ng-pristine ng-invalid"
            />
            <div className="placeholder">
              <LocalizationString>e.g. Cat Lovers</LocalizationString>
            </div>
            <div className="label">
              <LocalizationString>Label</LocalizationString>
            </div>
          </div>
        </div>
        <div className="modal-footer margin-top-2">
          <div className="btn margin-right-1" onClick={closeModal}>
            <LocalizationString>Cancel</LocalizationString>
          </div>
          <div className="btn outline-blue" onClick={save}>
            <LocalizationString>Save</LocalizationString>
          </div>
        </div>
      </div>
    </div>
  )
}
