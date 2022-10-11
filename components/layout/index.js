import { useContext } from 'react'
import NotificationContext from '../../store/notification-context'
import Notification from '../ui/notification'
import MainHeader from './main-header'

export default function Layout({ children }) {
  const notificationCtx = useContext(NotificationContext)
  const activeNotification = notificationCtx.notification

  return (
    <>
      <MainHeader />
      <main>{children}</main>
      {activeNotification && <Notification {...activeNotification} />}
    </>
  )
}
