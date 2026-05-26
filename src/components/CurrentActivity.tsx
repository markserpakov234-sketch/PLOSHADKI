import type { ScheduleItem } from '../types/schedule';

type Props = {
  events: ScheduleItem[];
};

export default function CurrentActivity({ events }: Props) {
  const now = new Date();

  const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(
    now.getMinutes()
  ).padStart(2, '0')}`;

  const currentEvent = events.find((event) => {
    return currentTime >= event.start && currentTime < event.end;
  });

  if (!currentEvent) {
    return (
      <div>
        <h2>Сейчас ничего не идёт</h2>
      </div>
    );
  }

  return (
    <div>
      <h2>Сейчас идёт</h2>

      <h3>{currentEvent.activity}</h3>

      <p>
        {currentEvent.start} - {currentEvent.end}
      </p>
    </div>
  );
}
