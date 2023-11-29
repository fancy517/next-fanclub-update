import { TAccount } from './account'

export type TPost = {
  Creator: TAccount
  description: string
  tags: Array<string>
  Attachment: TPostAttachment
  comments_cnt: string
  reply_role: string
  publish_date: string
  disappear_date: string
  likes_cnt: string
  is_liked: string
  id: string
  is_pinned: string
}

export type TPostAttachment = {
  Medias: Array<TMedia>
}

export type TMediaType = 'video' | 'image'

export type TMedia = {
  id: string
  type: TMediaType
  sensitive?: boolean
  locked?: boolean
  sourceid?: string
  preview?: string
  timestamp?: number
  tags?: string
}

export type TMediaSize = 'normal' | 'small'

export type TPermission = 'following' | 'subscribed' | 'followed' | number
export type TPermissionArray = Array<TPermission>