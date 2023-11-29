import { useEffect, useState } from 'react'
import MediaVaultAlbumsContainer from './MediaVaultAlbumsContainer'
import MediaVaultContent from './MediaVaultContent'

type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function FCMediaVault({
  children,
  className = '',
  ...rest
}: Props) {
  const [albumIndex, setAlbumIndex] = useState(-1)
  useEffect(() => {
    console.log('vault is loaded')
  }, [])

  return (
    <div className={`fc-media-vault ${className}`} {...rest}>
      {albumIndex == -1 ? (
        <MediaVaultAlbumsContainer onSelect={(id) => setAlbumIndex(id)} />
      ) : (
        <MediaVaultContent
          onSelect={(id) => setAlbumIndex(id)}
          selected={albumIndex}
        />
      )}
    </div>
  )
}
