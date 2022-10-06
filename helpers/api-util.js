export async function getAllEvents() {
  const response = await fetch(
    'https://nextjs-events-28acb-default-rtdb.asia-southeast1.firebasedatabase.app/events.json'
  )
  const events = await response.json()
  return events
}

export async function getFeaturedEvents() {
  const allEevents = await getAllEvents()
  return allEevents.filter((event) => event.isFeatured)
}

export async function getEventById(id) {
  const allEevents = await getAllEvents()
  return allEevents.find((event) => event.id === id)
}
