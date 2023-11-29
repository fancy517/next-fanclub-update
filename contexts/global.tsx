import FCNavMenuSide from '@/components/nav/FCNavMenuSide'
import classNames from 'classnames'
import { createContext, useContext, useState } from 'react'

interface TGlobalContext {
  openSideNav: () => void
  closeSideNav: () => void
}

const GlobalContext = createContext<TGlobalContext | null>(null)

const GlobalWrapper = ({ children }: { children: React.ReactNode }) => {
  // side nav bar
  const [open, setOpen] = useState(false)

  const openSideNav = () => {
    setOpen(true)
  }
  const closeSideNav = () => {
    setOpen(false)
  }

  return (
    <GlobalContext.Provider value={{ openSideNav, closeSideNav }}>
      {open && <FCNavMenuSide onClose={closeSideNav} />}
      <div
        className={classNames('global-wrapper', {
          'menu-open': open,
        })}
      >
        {children}
      </div>
      {open && (
        <div className="menu-open-overlay" onClick={() => setOpen(false)}></div>
      )}
    </GlobalContext.Provider>
  )
}

const useGlobalContext = () => {
  const ctx = useContext(GlobalContext)
  if (!ctx) {
    throw new Error('Global context does not exist')
  }
  return ctx
}

export { GlobalWrapper, useGlobalContext }
