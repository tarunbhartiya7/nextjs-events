import { createContext, useEffect, useState } from 'react'

const NotificationContext = createContext({
  notification: null, // {title, message, status}
  showNotification: function (notification) {},
  hideNotification: function () {},
})

export function NotificationContextProvider({ children }) {
  const [activeNotification, setActiveNotification] = useState()

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === 'error' ||
        activeNotification.status === 'success')
    ) {
      const timer = setTimeout(() => {
        setActiveNotification(null)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [activeNotification])

  function showNotificationHandler(notification) {
    setActiveNotification(notification)
  }

  function hideNotificationHandler() {
    setActiveNotification(null)
  }

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  }

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
