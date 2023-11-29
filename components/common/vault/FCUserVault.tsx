'use client'

import { useState } from 'react'
import UserVaultAlbumsContainer from './UserVaultAlbumsContainer'
import { mockAlbums } from '@/mock/albums'
import UserVaultContents from './UserVaultContents'

type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function FCUserVault({
  children,
  className = '',
  ...rest
}: Props) {
  const [albumId, setAlbumId] = useState(-1)

  return (
    <div className={`fc-user-vault ${className}`} {...rest}>
      {albumId == -1 ? (
        <UserVaultAlbumsContainer
          albums={mockAlbums}
          onOpen={(aid) => setAlbumId(aid)}
        />
      ) : (
        <UserVaultContents
          albums={mockAlbums}
          onBack={() => setAlbumId(-1)}
          selectedId={albumId}
          onAlbumChange={(aid) => setAlbumId(aid)}
        />
      )}
    </div>
  )
}
