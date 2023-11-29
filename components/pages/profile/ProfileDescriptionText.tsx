type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function ProfileDescriptionText({
  children,
  className,
  ...rest
}: Props) {
  return (
    <div className="profile-description-text">
      <span>
        
        this is description
      </span>
    </div>
  )
}
