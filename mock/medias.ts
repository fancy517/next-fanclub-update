import { TMedia } from '@/types/media'

export const mockMedias: Array<TMedia> = [
  {
    type: 'image',
    sensitive: false,
    locked: true,
    preview: '/images/preview1.jpg',
    timestamp: 100,
  },
  {
    type: 'image',
    sensitive: false,
    locked: false,
    sourceid: '/images/media1.jpg',
    timestamp: 100,
  },
  {
    type: 'image',
    sensitive: true,
    locked: false,
    sourceid: '/images/media2.jpg',
    timestamp: 100,
  },
]
