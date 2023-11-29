import FCMediaVault from '@/components/common/vault/FCMediaVault'

type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function DashboardVault({
  children,
  className = '',
  ...rest
}: Props) {
  return (
    <div className={`dashboard-vault ${className}`} {...rest}>
      <FCMediaVault />
    </div>
  )
}
