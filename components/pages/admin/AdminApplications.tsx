import FCAccountAvatar from '@/components/common/account/FCAccountAvatar'
import FCAccountUsername from '@/components/common/account/FCAccountUsername'
import FCButtonNew from '@/components/common/button/FCButtonNew'
import { mockCreatorAccounts } from '@/mock/users'
import { TAccount } from '@/types/account'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function AdminApplications({
  children,
  className = '',
  ...rest
}: Props) {
  const router = useRouter()
  const gotoApplication = (name: string) => () =>
    router.push(`/admin/applications/${name}`)
  const [accounts, setAccounts] = useState<TAccount[]>([])
  const [isReload, setIsReload] = useState(false)
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/applications`)
        const responsedata = await response.json()
        console.log(responsedata)
        const _accounts: TAccount[] = []
        responsedata.forEach((element: any) => {
          const newAccount: TAccount = {
            displayName: element.displayname,
            userName: element.username,
            availability: "online",
            avatarUrl: element.avatar,
            bannerUrl: "",
            verified: true,
          }
          _accounts.push(newAccount)
        })
        setAccounts(_accounts)
      } catch (err) {
        toast.error("Error Occured")
        console.log(err)
      }
    }
    fetchdata()
  }, [isReload])
  const onRejectApplication = async (username: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/rejectapplication?username=${username}`)
      const responsedata = await response.json()
      if (responsedata === "success") {
        toast.success("Rejected Application")
        setIsReload(!isReload)
      }
      else {
        toast.error("Error Occured")
      }
    } catch (error) {
      toast.error("Error Occured")
      console.error(error)
    }
  }

  const onAcceptApplication = async (username: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/acceptapplication?username=${username}`)
      const responsedata = await response.json()
      if (responsedata === "success") {
        toast.success("Accepted Application")
        setIsReload(!isReload)
      }
      else {
        toast.error("Error Occured")
      }
    } catch (error) {
      toast.error("Error Occured")
      console.error(error)
    }
  }

  return (
    <div className={`${className}`} {...rest}>
      {accounts.map((account, i) => (
        <div key={i} style={{ padding: 10 }} className="admin-application-item">
          <div className="flex-row flex-align-center">
            <div className="margin-right-2">
              <FCAccountAvatar account={account} />
            </div>
            <div>
              <FCAccountUsername account={account} showColumn={true} />
            </div>
            <div className="flex-1"></div>

            <div
              className="btn outline-grey margin-right-3"
              onClick={gotoApplication(account.userName)}
            >
              View
            </div>
            <FCButtonNew
              buttonContent={
                <div className="btn outline-blue margin-right-3">Accept</div>
              }
              confirmationContent={
                <div className="flex-row margin-top-1">
                  Do you want to accept this application?
                </div>
              }
              cb={(status: string) => {
                if (status === "yes") {
                  onAcceptApplication(account.userName)
                }
              }}
            />
            <FCButtonNew
              buttonContent={
                <div className="btn outline-red margin-right-3">Reject</div>
              }
              confirmationContent={
                <div className="flex-row margin-top-1">
                  Do you want to reject this application?
                </div>
              }
              cb={(status: string) => {
                if (status === "yes") {
                  onRejectApplication(account.userName)
                }
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
