import { TPost } from '@/types/media'
import { mockCreatorAccounts } from './users'

const defaultTags = [
  'wops',
  'zxcv',
  'fyp',
  'redhead',
  'fit',
  'qwer',
  'topless',
  'tattoo',
]

const defaultDescription = 'hey hey hey hey this is description'

export const mockPosts: Array<TPost> = [
  {
    Creator: {
      displayName: 'Stanley Andersen',
      userName: 'stanleyandersen',
      availability: 'available',
      avatarUrl: '/images/avatar1.jpg',
      bannerUrl: '/images/banner1.png',
      verified: true,
    },
    description: "defaultDescription",
    tags: [
      'abc',
      'def',
      'ghi',
      'jkl',
    ],
    Attachment: {
      Medias: [
        {
          type: 'image',
          sensitive: false,
          locked: false,
          sourceid: '/images/media1.jpg',
          timestamp: 100,
        },
      ],
    },
  },

  {
    Creator: mockCreatorAccounts[3],
    description: defaultDescription,
    tags: defaultTags,
    Attachment: {
      Medias: [
        {
          type: 'image',
          sensitive: false,
          locked: false,
          sourceid: '/images/media1.jpg',
          timestamp: 100,
        },
        {
          type: 'video',
          sensitive: false,
          locked: false,
          sourceid: '/videos/dummy_video1.mp4',
          timestamp: 100,
        },
        {
          type: 'video',
          sensitive: false,
          locked: false,
          sourceid: '/videos/dummy_video1.mp4',
          timestamp: 100,
        },
      ],
    },
  },
  {
    Creator: mockCreatorAccounts[0],
    description: defaultDescription,
    tags: defaultTags,
    Attachment: {
      Medias: [
        {
          type: 'image',
          sensitive: true,
          locked: false,
          sourceid: '/images/media1.jpg',
          timestamp: 100,
        },
      ],
    },
  },
  {
    Creator: mockCreatorAccounts[0],
    description: defaultDescription,
    tags: defaultTags,
    Attachment: {
      Medias: [
        {
          type: 'image',
          sensitive: false,
          locked: true,
          preview: '/images/preview1.jpg',
          timestamp: 100,
        },
      ],
    },
  },
  {
    Creator: mockCreatorAccounts[1],
    description: defaultDescription,
    tags: defaultTags,
    Attachment: {
      Medias: [
        { type: 'image', sensitive: true, locked: true, timestamp: 100 },
      ],
    },
  },

  // videos
  {
    Creator: mockCreatorAccounts[1],
    description: defaultDescription,
    tags: defaultTags,
    Attachment: {
      Medias: [
        {
          type: 'video',
          sensitive: false,
          locked: false,
          sourceid: '/videos/dummy_video1.mp4',
          timestamp: 100,
        },
      ],
    },
  },

  {
    Creator: mockCreatorAccounts[2],
    description: defaultDescription,
    tags: defaultTags,
    Attachment: {
      Medias: [
        { type: 'video', sensitive: false, locked: true, timestamp: 100 },
      ],
    },
  },

  {
    Creator: mockCreatorAccounts[2],
    description: defaultDescription,
    tags: defaultTags,
    Attachment: {
      Medias: [
        {
          type: 'video',
          sensitive: true,
          locked: false,
          sourceid: '/videos/dummy_video1.mp4',
          timestamp: 100,
        },
      ],
    },
  },

  // true,true
  {
    Creator: mockCreatorAccounts[2],
    description: defaultDescription,
    tags: defaultTags,
    Attachment: {
      Medias: [
        {
          type: 'video',
          sensitive: true,
          locked: true,
          preview: '/videos/video_preview.png',
          timestamp: 100,
        },
      ],
    },
  },

  // ------------
  // ---Bundle---
  // ------------
  {
    Creator: mockCreatorAccounts[3],
    description: defaultDescription,
    tags: defaultTags,
    Attachment: {
      Medias: [
        {
          type: 'image',
          sensitive: false,
          locked: false,
          sourceid: '/images/media2.jpg',
          timestamp: 100,
        },
        {
          type: 'image',
          sensitive: false,
          locked: false,
          sourceid: '/images/media3.jpg',
          timestamp: 100,
        },
      ],
    },
  },

  {
    Creator: mockCreatorAccounts[3],
    description: defaultDescription,
    tags: defaultTags,
    Attachment: {
      Medias: [
        {
          type: 'image',
          sensitive: false,
          locked: false,
          sourceid: '/images/media1.jpg',
          timestamp: 100,
        },
        {
          type: 'video',
          sensitive: false,
          locked: false,
          sourceid: '/videos/dummy_video1.mp4',
          timestamp: 100,
        },
        {
          type: 'video',
          sensitive: false,
          locked: false,
          sourceid: '/videos/dummy_video1.mp4',
          timestamp: 100,
        },
        {
          type: 'image',
          sensitive: false,
          locked: false,
          sourceid: '/images/media2.jpg',
          timestamp: 100,
        },
      ],
    },
  },
  {
    Creator: mockCreatorAccounts[3],
    description: defaultDescription,
    tags: defaultTags,
    Attachment: {
      Medias: [
        {
          type: 'image',
          sensitive: false,
          locked: false,
          sourceid: '/images/media1.jpg',
          timestamp: 100,
        },
        {
          type: 'image',
          sensitive: false,
          locked: false,
          sourceid: '/images/media2.jpg',
          timestamp: 100,
        },
        {
          type: 'image',
          sensitive: false,
          locked: false,
          sourceid: '/images/media3.jpg',
          timestamp: 100,
        },
        {
          type: 'image',
          sensitive: false,
          locked: false,
          sourceid: '/images/media4.jpg',
          timestamp: 100,
        },
      ],
    },
  },
]
