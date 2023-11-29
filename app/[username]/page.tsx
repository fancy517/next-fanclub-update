import { redirect } from 'next/navigation'

type Props = {
  params: {
    username: string
  }
}

export default function Page({ params }: Props) {
  redirect(`/${params.username}/posts`)
}
