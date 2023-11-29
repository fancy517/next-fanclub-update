import SubscriptionTierEditModal from './SubscriptionTierEditModal'

type Props = {
  className?: string
  [x: string]: any
  data: {
    cb: () => void
  }
}

export default function SubscriptionTierCreateModal(p: Props) {
  return <SubscriptionTierEditModal {...p} isCreate={true} />
}
