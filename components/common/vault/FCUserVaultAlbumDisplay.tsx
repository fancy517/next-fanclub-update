type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function FCUserVaultAlbumDisplay({
  children,
  className,
  ...rest
}: Props) {
  return (
    <div
      className={`fc-user-vault-album-display ${className ?? ''}`}
      {...rest}
    ></div>
  )
}
