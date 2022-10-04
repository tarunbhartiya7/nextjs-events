import classes from "./event-list.module.css";
import EventItem from "./event-item";

export default function EventList({ items }) {
  return (
    <ul className={classes.list}>
      {items.map((event) => (
        <EventItem key={event.id} {...event} />
      ))}
    </ul>
  );
}
