import { useRouter } from 'next/router'
import EventList from '../../components/events/event-list'
import EventsSearch from '../../components/events/events-search'
import { getAllEvents } from '../../helpers/api-util'

export default function AllEventsPage({ events }) {
  const router = useRouter()

  function findEventsHandler(year, month) {
    router.push(`/events/${year}/${month}`)
  }

  return (
    <>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  )
}

export async function getStaticProps({ params }) {
  const events = await getAllEvents()

  return {
    props: {
      events,
    },
    revalidate: 60,
  }
}
