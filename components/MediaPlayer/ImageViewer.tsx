import Image from 'next/image'

type Props = {
  contentID: string
}

export default function ImageViewer({ contentID }: Props) {
  return (
    <div className="w-100 position-relative image-viewer">
      <Image
        src={`http://localhost:1935/api/content/${contentID}`}
        fill
        alt=""
      />
    </div>
  )
}
