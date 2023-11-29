import FCNotificationRoute from '@/components/pages/notifications/FCNotificationRoute'
import { mockNotifications } from '@/mock/notifications'

export default function NotificationsPage() {
  return <FCNotificationRoute data={mockNotifications} />
}
