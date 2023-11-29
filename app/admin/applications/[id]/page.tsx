import AdminDashboard from '@/components/pages/admin/AdminDashboard'

type Props = {
  params: {
    id: string
  }
}

export default function Page({ params }: Props) {
  return <AdminDashboard currentPage="application" username={params.id} />
}
