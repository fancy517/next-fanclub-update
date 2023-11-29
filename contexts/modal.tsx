'use client'

import { TModalMeta } from '@/types'
import { createContext, useContext, useState } from 'react'

interface TModalContextData {
  metas: Array<TModalMeta>
  pop: () => void
  forcePop: () => void
  push: (m: TModalMeta) => void
}
// type TModalMetaList = Array<TModalMeta>;

const ModalContext = createContext<TModalContextData | null>(null)

type Props = {
  children: React.ReactNode
}

const ModalContextProvider = ({ children }: Props) => {
  const [metaList, setMetaList] = useState<Array<TModalMeta>>([])
  const pop = () => {
    if (metaList.length > 0) {
      if (metaList[metaList.length - 1].id != 'agegate') {
        setMetaList(metaList.slice(0, -1))
      }
    }
  }
  const forcePop = () => {
    metaList.length > 0 && setMetaList(metaList.slice(0, -1))
  }
  const push = (m: TModalMeta) => {
    setMetaList([...metaList, m])
  }
  return (
    <ModalContext.Provider value={{ metas: metaList, push, pop, forcePop }}>
      {children}
    </ModalContext.Provider>
  )
}

const useModalMeta = () => {
  const ctx = useContext(ModalContext)
  if (!ctx) {
    throw new Error('Please use ModalContextProvider in parent component')
  }
  return ctx
}

export { ModalContext, ModalContextProvider, useModalMeta }
