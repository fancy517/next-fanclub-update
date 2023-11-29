import { TAccount } from './account'

export type TPurchaseRecord = {
  date: string
  creator: TSimpleAccount
  type: 'subscribe' | 'media' | 'tippost' | 'tipuser'
  value: number
  amount: number
}

export type TSimpleAccount = {
  id?: number,
  avatar: string,
  username: string,
  displayname: string,
}

export type TTransactionRecord = {
  type: 'deposit' | 'withdraw'
  amount: number
  hash: string
  date: string
  walletAddress: string
}
