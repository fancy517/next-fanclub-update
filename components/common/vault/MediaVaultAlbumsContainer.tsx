import { useModalMeta } from '@/contexts/modal'

type Props = {
  children?: React.ReactNode
  className?: string
  onSelect: (id: number) => void
  [x: string]: any
}

const mockMediaAlbums = ['All', 'Posts', 'Messages']

export default function MediaVaultAlbumsContainer({
  children,
  className = '',
  onSelect,
  ...rest
}: Props) {
  const { push } = useModalMeta()
  const addMediaVaultAlbum = (title: string, desc: string) => {}
  const showAddAlbumModal = () =>
    push({ id: 'mediavaultalbumcreate', data: { cb: addMediaVaultAlbum } })

  return (
    <div className="vault-albums-container" {...rest}>
      <div className="flex-row flex-align-center margin-top-1 xd-drag-ignore">
        <div className="bubble" onClick={showAddAlbumModal}>
          <i className="fal fa-plus"></i>
        </div>
        <div className="font-size-xl semi-bold flex-row">My Albums</div>
        <div className="flex-1"></div>
        {/* <div className="bubble">
          <i className="fa-light fa-arrows-up-down-left-right"></i>
        </div> */}
      </div>
      <div className="vault-albums margin-top-1">
        {mockMediaAlbums.map((album, i) => (
          <div className="vault-album" key={i}>
            <div
              className="vault-album-media drag-surface"
              onClick={() => onSelect(i)}
            >
              <div className="no-preview dark-blue-1 font-size-xl">
                <i className="fa-light fa-images"></i>
              </div>
            </div>
            <div className="vault-album-footer margin-top-text margin-bottom-text xd-drag-ignore">
              <div className="semi-bold">{album}</div>
              <div className="dark-blue-1">0</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
