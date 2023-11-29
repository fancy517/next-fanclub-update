import { TAccount } from '@/types/account'

export const mockCreatorAccounts: Array<TAccount> = [
  {
    displayName: 'Stanley Andersen',
    userName: 'stanleyandersen',
    availability: 'online',
    avatarUrl: '/images/avatar1.jpg',
    bannerUrl: '/images/banner1.png',
    verified: true,
  },
  {
    displayName: 'Forest Reid',
    userName: 'forestreid',
    availability: 'away',
    avatarUrl: '/images/avatar2.jpg',
    bannerUrl: '/images/banner2.jpg',
    verified: true,
  },
  {
    displayName: 'Willian Cunningham',
    userName: 'williancunningham',
    availability: 'online',
    avatarUrl: '/images/avatar3.jpg',
    bannerUrl: '/images/banner3.jpg',
    verified: true,
  },
  {
    displayName: 'Buster Cherry',
    userName: 'bustercherry',
    availability: 'away',
    avatarUrl: '/images/avatar4.jpg',
    bannerUrl: '/images/banner4.jpg',
    verified: true,
  },
]

export const mockUser: TAccount = {
  displayName: 'John Doe',
  userName: 'johndoe',
  availability: 'online',
  // avatarUrl: "/images/avatar4.jpg",
  // bannerUrl: "/images/banner4.jpg",
}

export const AnonymousUser = mockUser

export const mockAdmin: TAccount = {
  displayName: 'admin',
  userName: 'admin',
  availability: 'online',
  admin: true,
}
