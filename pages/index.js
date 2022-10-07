import Head from 'next/head'
import EventList from '../components/events/event-list'
import { getFeaturedEvents } from '../helpers/api-util'

export default function HomePage({ featuredEvents }) {
  return (
    <>
      <Head>
        <title>NextJS Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>
      <EventList items={featuredEvents} />
    </>
  )
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents()

  return {
    props: {
      featuredEvents,
    },
    revalidate: 1800, // every 30 min regenerate the page for new request
  }
}
