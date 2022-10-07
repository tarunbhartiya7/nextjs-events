import { useRouter } from 'next/router'
import EventList from '../../components/events/event-list'
import ResultsTitle from '../../components/events/results-title'
import Button from '../../components/ui/button'
import ErrorAlert from '../../components/ui/error-alert'
import { getFilteredEvents } from '../../helpers/api-util'

export default function FilteredEventsPage({ events, year, month }) {
  // if (props.hasError) {
  //   return (
  //     <>
  //       <ErrorAlert>
  //         <p>Invalid filter. Please adjust your values!</p>
  //       </ErrorAlert>
  //       <div className="center">
  //         <Button link="/events">Show All Events</Button>
  //       </div>
  //     </>
  //   )
  // }

  if (!events || events.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No Events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    )
  }

  const date = new Date(year, month - 1)

  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={events} />
    </>
  )
}

export async function getServerSideProps({ params }) {
  const filterData = params.slug
  const filteredYear = +filterData[0]
  const filteredMonth = +filterData[1]

  if (
    isNaN(filteredYear) ||
    isNaN(filteredMonth) ||
    filteredYear > 2030 ||
    filteredYear < 2021 ||
    filteredMonth < 1 ||
    filteredMonth > 12
  ) {
    return {
      // props: {
      //   hasError: true
      // },
      notFound: true,
      // redirect: {
      //   destination: '/error'
      // }
    }
  }

  const filterEvents = await getFilteredEvents({
    year: filteredYear,
    month: filteredMonth,
  })

  return {
    props: {
      events: filterEvents,
      year: filteredYear,
      month: filteredMonth,
    },
  }
}
