'use client'
import FCListRoute from '@/components/pages/lists/FCListRoute'
import { useAuth } from '@/contexts/auth'
import { mockLists } from '@/mock/lists'
import { mockCreatorAccounts } from '@/mock/users'
import { TSimpleAccount } from '@/types/payment'
import { useEffect, useState } from 'react'

type Props = {
  params: {
    id: string
  }
}

export default function Page({ params }: Props) {
  const { user } = useAuth()
  const [listname, setListName] = useState("")
  const [userlist, setUserList] = useState<TSimpleAccount[]>([])
  const [reload, setReload] = useState(false)
  useEffect(() => {
    if (!user) return

    const fetchdata = async () => {
      let url = ""
      if (params.id === "blocked_accounts") {
        url = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/user/get_blocklist?userid=${user.userID}`
        setListName("Blocked Accounts")
      } else if (params.id === "muted_accounts") {
        setListName("Muted Accounts")
        url = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/user/get_mutelist?userid=${user.userID}`
      } else if (params.id === "vip_accounts") {
        setListName("VIP Accounts")
        url = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/user/get_viplist?userid=${user.userID}`
      } else {
        url = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/user/get_customlist?userid=${user.userID}&listid=${params.id}`
      }
      try {
        const response = await fetch(url)
        const data = await response.json()
        if (params.id === "blocked_accounts" || params.id === "muted_accounts" || params.id === "vip_accounts") {
          setUserList(data)
        } else {
          setUserList(data.userlist)
          setListName(data.listname)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchdata()
  }, [user, reload])
  console.log("userlist", userlist)
  return <FCListRoute listname={listname} items={userlist} listid={params.id} cb={() => { setReload(!reload) }} />
}
