import { TAccount } from '@/types/account'
import { createContext, useContext } from 'react'

interface TAuthContextData {
  user: TAccount | null
  signOut: () => void
}

const AuthContext = createContext<TAuthContextData | null>(null)

const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('Please use AuthContextProvider in parent component')
  }
  return ctx
}

export { AuthContext, useAuth }
