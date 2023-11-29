import FCExploreRoute from '@/components/pages/explore/FCExploreRoute'

type Props = {
  params: {
    tag: string
  }
}

export default function ExploreTagPage({ params }: Props) {
  return <FCExploreRoute tagName={params.tag} />
}
