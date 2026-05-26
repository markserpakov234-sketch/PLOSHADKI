import type { ScheduleItem } from '../types/schedule';

type Props = {
  events: ScheduleItem[];
};

export default function ScheduleTimeline({ events }: Props) {
  return (
    <div>
      {events.map((event, index) => (
        <div key={index}>
          <p>
            {event.start} - {event.end}
          </p>

          <h3>{event.activity}</h3>
        </div>
      ))}
    </div>
  );
}
