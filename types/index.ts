import { TAccount } from './account'

export type TAlbum = {
  id: number
  name: string
  description: string
  count: number
}

export type TList = {
  id: string
  name: string
  entries: number
}

export type TNotificationType =
  | 'follow'
  | 'postlike'
  | 'postreply'
  | 'planstarted'
  | 'subscriptionexpire'

export type TNotification = {
  id: number
  type: TNotificationType
  user: TAccount
  timestamp: string
}

export type TPermissionFlag = {
  perm: 'following' | 'subscribed' | 'follower' | 'tip'
  value?: number
}

export type TPermission = Array<Array<TPermissionFlag>>

export type TModalID =
  | 'login'
  | 'forgotpassword'
  | 'usernamechange'
  | 'setup2fa'
  | 'remove2fa'
  | '2fasessioncreate'
  | 'passwordchange'
  | 'subscribe'
  | 'orderconfirm'
  | 'editprofile'
  | 'media'
  | 'uservaultalbumcreate'
  | 'uservaultalbumedit'
  | 'uservaultalbumdelete'
  | 'uservaultalbumselect'
  | 'buttonnewconfirmation'
  | 'newmessage'
  | 'createtip'
  | 'accountmediaupload'
  | 'createlist'
  | 'editlist'
  | 'mediavaultalbumcreate'
  | 'mediavaultpicker'
  | 'datepicker'
  | 'subscriptiontieredit'
  | 'subscriptiontiercreate'
  | 'postcreate'
  | 'postedit'
  | 'postdetail'
  | 'mediatag'
  | 'emailchangenew'
  | 'accountmediapermissions'
  | 'reportcontent'
  | 'listaddaccount'
  | 'agegate'
  | 'mediabrowser'
export type TModalMeta = {
  id: TModalID
  data: any
}
