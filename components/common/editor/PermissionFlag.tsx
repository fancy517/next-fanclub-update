import { TPermissionFlag } from '@/types'

type Props = {
  perm: TPermissionFlag
}

export default function PermissionFlag() {
  return (
    <div className="flex-row flex-wrap flex-align-center permission-flag capitalize max-100">
      <span className="margin-right-text">subscribed</span>
      <small> (All Tiers) </small>
      <i className="fa-fw fal fa-trash-can margin-left-text blue-1-hover-only pointer"></i>
    </div>
  )
}
