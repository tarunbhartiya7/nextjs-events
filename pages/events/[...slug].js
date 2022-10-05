import { useRouter } from 'next/router'
import EventList from '../../components/events/event-list'
import ResultsTitle from '../../components/events/results-title'
import Button from '../../components/ui/button'
import ErrorAlert from '../../components/ui/error-alert'
import { getFilteredEvents } from '../../dummy-data'

export default function FilteredEventsPage() {
  const router = useRouter()
  const filterData = router.query.slug

  console.log()

  if (!filterData) {
    return <p className="center">Loading...</p>
  }

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
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    )
  }

  const filterEvents = getFilteredEvents({
    year: filteredYear,
    month: filteredMonth,
  })

  if (!filterEvents || filterEvents.length === 0) {
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

  const date = new Date(filteredYear, filteredMonth - 1)

  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={filterEvents} />
    </>
  )
}
