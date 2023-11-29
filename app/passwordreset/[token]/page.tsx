import FCPasswordResetVerifyRoute from '@/components/pages/landing/FCPasswordResetVerifyRoute'

type Props = {
  params: {
    token: string
  }
}

export default function Page({ params }: Props) {
  return <FCPasswordResetVerifyRoute token={params.token} />
}
