import Head from 'next/head'
import EventContent from '../../components/event-detail/event-content'
import EventLogistics from '../../components/event-detail/event-logistics'
import EventSummary from '../../components/event-detail/event-summary'
import Comments from '../../components/input/comments'
import ErrorAlert from '../../components/ui/error-alert'
import { getEventById, getFeaturedEvents } from '../../helpers/api-util'

export default function EventDetailPage({ event }) {
  // const router = useRouter()
  // const eventId = router.query.eventId

  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    )
  }
  return (
    <>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </>
  )
}

export async function getStaticProps({ params }) {
  const event = await getEventById(params.eventId)

  if (!event) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      event,
    },
    revalidate: 30,
  }
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents()
  const paths = events.map((event) => ({ params: { eventId: event.id } }))

  return {
    paths,
    fallback: true,
  }
}
