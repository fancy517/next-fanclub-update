import { TPurchaseRecord, TTransactionRecord } from '@/types/payment'
import { mockCreatorAccounts } from './users'

export const mockPurchaseHistory: Array<TPurchaseRecord> = [
  {
    date: 'Nov 11, 2022',
    creator: mockCreatorAccounts[0],
    type: 'subscribe',
    amount: 10,
  },
  {
    date: 'Oct 11, 2022',
    creator: mockCreatorAccounts[1],
    type: 'ppv',
    postId: '861354687651',
    amount: 10,
  },
  {
    date: 'Jan 21, 2022',
    creator: mockCreatorAccounts[2],
    type: 'subscribe',
    amount: 10,
  },
  {
    date: 'Feb 11, 2022',
    creator: mockCreatorAccounts[3],
    type: 'ppv',
    postId: '96513467987',
    amount: 10,
  },
]

export const mockTransactionHistory: Array<TTransactionRecord> = [
  {
    type: 'deposit',
    amount: 16.5,
    hash: '984216549871654654324',
    date: 'Nov 11, 2022',
    walletAddress: 'TPQA1hEPLujqhuCxAVLCsiwg7SQgjzrc6q',
  },
  {
    type: 'deposit',
    amount: 16.5,
    hash: '984216549871654654324',
    date: 'Nov 11, 2022',
    walletAddress: 'TPQA1hEPLujqhuCxAVLCsiwg7SQgjzrc6q',
  },
  {
    type: 'withdraw',
    amount: 16.5,
    hash: '984216549871654654324',
    date: 'Nov 11, 2022',
    walletAddress: 'TPQA1hEPLujqhuCxAVLCsiwg7SQgjzrc6q',
  },
  {
    type: 'withdraw',
    amount: 16.5,
    hash: '984216549871654654324',
    date: 'Nov 11, 2022',
    walletAddress: 'TPQA1hEPLujqhuCxAVLCsiwg7SQgjzrc6q',
  },
  {
    type: 'deposit',
    amount: 16.5,
    hash: '984216549871654654324',
    date: 'Nov 11, 2022',
    walletAddress: 'TPQA1hEPLujqhuCxAVLCsiwg7SQgjzrc6q',
  },
]
