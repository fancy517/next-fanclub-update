import { useModalMeta } from '@/contexts/modal'
import { TAlbum } from '@/types'

type Props = {
  children?: React.ReactNode
  className?: string
  albums: Array<TAlbum>
  onOpen: (albumId: number) => void
  [x: string]: any
}

export default function VaultAlbumsContainer({
  children,
  className,
  albums,
  onOpen,
  ...rest
}: Props) {
  const { push } = useModalMeta()

  const createUserAlbum = (title: string, desc: string) => {}
  const showCreateModal = () => {
    push({
      id: 'uservaultalbumcreate',
      data: { cb: createUserAlbum },
    })
  }
  return (
    <div className={`vault-albums-container ${className ?? ''}`} {...rest}>
      <div className="flex-row flex-align-center margin-top-1 xd-drag-ignore">
        <div className="bubble" onClick={showCreateModal}>
          <i className="fal fa-plus"></i>
        </div>
        <div className="font-size-xl semi-bold flex-row">Albums</div>
        <div className="flex-1"></div>
        {/* <div className="bubble">
          <i className="fa-light fa-arrows-up-down-left-right"></i>
        </div> */}
      </div>
      <div className="vault-albums margin-top-1">
        {albums.map((al, i) => (
          <div className="vault-album" key={i} onClick={() => onOpen(i)}>
            <div className="vault-album-media drag-surface">
              <div className="no-preview dark-blue-1 font-size-xl">
                <i className="fa-light fa-images"></i>
              </div>
            </div>
            <div className="vault-album-footer margin-top-text margin-bottom-text xd-drag-ignore">
              <div className="semi-bold">{al.name}</div>
              <div className="dark-blue-1">{al.count}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
