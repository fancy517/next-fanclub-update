import FCButtonNew from '@/components/common/button/FCButtonNew'
import { useAuth } from '@/contexts/auth'
import { TSession } from '@/types/session'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function FCSessionManagementRoute({
  children,
  className,
  ...rest
}: Props) {
  const [sessions, setSessions] = useState<TSession[]>([])
  const [isReload, setIsReload] = useState(false)
  const { user } = useAuth()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/get_sessions?username=${user?.userName}`)
        const data = await response.json();
        const _sessions: TSession[] = []
        data.forEach((element: any) => {
          const newSession: TSession = {
            id: element.id,
            ipAddress: element.last_used_ip,
            lastUsed: element.last_used_time,
            location: element.last_used_location,
          }
          _sessions.push(newSession)
        });
        setSessions(_sessions)
      } catch (error) {
        console.error('Error fetching IP information:', error);
      }
    };

    fetchData();
  }, [user, isReload])

  const onRemove = async (id: number) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/close_session?username=${user?.userName}&sid=${id}`)
      const data = await response.json()
      if (data === "success") {
        toast.success("Session is closed")
        setIsReload(!isReload)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onRemoveAll = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/clear_sessions?username=${user?.userName}`)
      const data = await response.json()
      if (data === "success") {
        toast.success("Sessions are all cleared")
        setIsReload(!isReload)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={`fc-session-management-route ${className ?? ''}`} {...rest}>
      <div>
        <div className="bold margin-bottom-text flex-row">
          <div className="flex-1">Session Management</div>
          <div className="flex-0" onClick={() => setIsReload(!isReload)}>
            <i className="blue-1 fas fa-fw fa-refresh hover pointer"></i>
          </div>
        </div>
        <div className="margin-bottom-2">
          <FCButtonNew
            buttonContent={
              <div className="btn outline-red">Close All Sessions</div>
            }
            confirmationContent={
              <div className="flex-row margin-top-1">
                Are you sure you want to close your sessions for all other
                devices?
              </div>
            }
            cb={(status: string) => { if (status === "yes") onRemoveAll() }}
          />
        </div>
        <div className="flex-col">
          {sessions.map((s, i) => (
            <div className={`session ${s.active && 'active-session'}`} key={i}>
              <div className="flex-row">
                <div className="session-title">Last used</div>
                <div className="session-value blue-1"> {(new Date(s.lastUsed)).toLocaleString()} </div>
              </div>
              <div className="flex-row margin-top-text">
                <div className="session-title">Last used IP</div>
                <div className="session-value green-1">{s.ipAddress}</div>
              </div>
              <div className="flex-row margin-top-text">
                <div className="session-title">Last used Location</div>
                <div className="session-value">{s.location}</div>
              </div>
              <div className="flex-row margin-top-1">
                <div className="session-title"></div>
                <div className="session-value">
                  <FCButtonNew
                    buttonContent={
                      <div className="btn outline-red">Close Session</div>
                    }
                    confirmationContent={
                      <div className="flex-row margin-top-1">
                        Do you want to Close the selected session?
                      </div>
                    }
                    cb={(status: string) => { if (status === "yes") onRemove(s.id) }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
