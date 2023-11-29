'use client'
import FCListsRoute from '@/components/pages/lists/FCListsRoute'
import { useAuth } from '@/contexts/auth'
import { mockLists } from '@/mock/lists'
import { TList } from '@/types'
import { useEffect, useState } from 'react'

export default function Page() {
  const { user } = useAuth()
  const defaultlist: TList[] = [
    { id: 'blocked_accounts', name: 'Blocked Accounts', entries: 0 },
    { id: 'muted_accounts', name: 'Muted Accounts', entries: 0 },
    { id: 'vip_accounts', name: 'VIP Accounts', entries: 0 },
  ]
  const [userlist, setUserList] = useState<TList[]>([])
  const [reload, setReload] = useState(false)
  useEffect(() => {
    if (!user) return
    const fetchdata = async () => {
      fetchdefault()
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/user/get_list?userid=${user.userID}`)
        const data = await response.json()
        const _userlist = defaultlist
        data.forEach((element: any) => {
          const _tlist: TList = {
            id: element.id,
            name: element.listname,
            entries: element.entries,
          }
          _userlist.push(_tlist)
        });
        setUserList(_userlist)
      } catch (error) {
        console.log(error)
      }
    }
    const fetchdefault = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/user/get_default_entries?userid=${user.userID}`)
        const data = await response.json()
        defaultlist[0].entries = data.block
        defaultlist[1].entries = data.mute
        defaultlist[2].entries = data.vip
      } catch (error) {
        console.log(error)
      }
    }
    fetchdata()
  }, [user, reload])
  return <FCListsRoute lists={userlist} cb={() => { setReload(!reload) }} />
}
