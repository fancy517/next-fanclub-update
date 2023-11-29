import FCProfileRoute from '@/components/pages/profile/FCProfileRoute'
import { mockCreatorAccounts } from '@/mock/users'

type Props = {
  params: {
    username: string
  }
}

export default function Page({ params }: Props) {
  return <FCProfileRoute tabId={3} account={"Anonymouse"} />
}
