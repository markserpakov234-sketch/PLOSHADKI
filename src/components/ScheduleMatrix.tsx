import type { ScheduleItem } from '../types/schedule';

type Props = {
  events: ScheduleItem[];
  dates: string[];
};

const TIMES = [
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
];

// перевод времени в минуты
function toMin(t: string) {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

export default function ScheduleMatrix({ events, dates }: Props) {
  return (
    <div className="overflow-auto">
      {/* HEADER */}
      <div className="grid grid-cols-[80px_repeat(4,1fr)] gap-2 mb-2">
        <div />

        {dates.map((d) => (
          <div key={d} className="text-center text-sm font-bold">
            {d}
          </div>
        ))}
      </div>

      {/* BODY */}
      <div className="space-y-2">
        {TIMES.map((time) => {
          const timeMin = toMin(time);

          return (
            <div
              key={time}
              className="grid grid-cols-[80px_repeat(4,1fr)] gap-2"
            >
              {/* time */}
              <div className="text-sm text-gray-500">{time}</div>

              {/* cells */}
              {dates.map((date) => {
                const event = events.find((e) => {
                  if (e.date !== date) return false;

                  const start = toMin(e.start);
                  const end = toMin(e.end);

                  return timeMin >= start && timeMin < end;
                });

                return (
                  <div
                    key={date + time}
                    className={`
                      border rounded-xl p-2 min-h-[40px]
                      flex items-center justify-center text-sm
                      ${event ? 'bg-white' : 'bg-gray-100 text-gray-400'}
                    `}
                  >
                    {event ? event.activity : 'свободно'}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
