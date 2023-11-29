import FCPostRoute from '@/components/pages/post/FCPostRoute'

type Props = {
  params: {
    id: string
  }
}

export default function Page({ params }: Props) {
  return <FCPostRoute postId={params.id} />
}
