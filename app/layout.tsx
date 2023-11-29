import type { Metadata } from 'next'
import { Inter, Roboto } from 'next/font/google'
import { Suspense, useEffect } from 'react'
import Loading from './loading'
// import { getServerSession } from 'next-auth'
import GuestPage from '@/components/pages/guest/guest'
import AppRoot from '@/components/AppRoot'

import './global.css'
import './global2.css'
import './global3.css'
import './fontawesome.css'
import '@/styles/main.scss'

// const inter = Inter({ subsets: ['latin'] })
// const roboto = Roboto({
//   subsets: ['latin'],
//   display: 'swap',
//   weight: ['100', '300', '400', '500', '700'],
// })

export const metadata: Metadata = {
  title: 'Fanclub',
  description:
    'Interact with your fans today and start selling content. Sign up today and make a free account.',
}

interface Props {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  // const session = await getServerSession()

  // if (!session) {
  //   return (
  //     <html lang="en">
  //       <body className={roboto.className}>
  //         <GuestPage />
  //       </body>
  //     </html>
  //   )
  // }


  return (
    <html lang="en" className="dark-theme">
      <body className={""}>
        <Suspense fallback={<Loading />}>
          <AppRoot>{children}</AppRoot>
        </Suspense>
      </body>
    </html>
  )

  // return (
  //   <html lang="en" className="dark-theme">
  //     <body className={roboto.className}>
  //       <div className="global-wrapper">
  //         <Suspense fallback={<Loading />}>
  //           <div className="site-wrapper nav-bar-visible nav-bar-top-visible">
  //             <AppNavBarTop />
  //             {/* <div>{children}</div> */}
  //             <div className="content-wrapper">
  //               <div className="page-wrapper">{children}</div>
  //             </div>
  //             <AppNavBarMobile />
  //           </div>
  //         </Suspense>
  //       </div>
  //     </body>
  //   </html>
  // )
}