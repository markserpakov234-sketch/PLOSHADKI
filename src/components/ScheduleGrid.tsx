import { timeSlots } from '../data/timeSlots';
import type { ScheduleItem } from '../types/schedule';

type Props = {
  events: ScheduleItem[];
};

export default function ScheduleGrid({ events }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {timeSlots.map((time) => {
        const event = events.find((e) => {
          return e.start === time;
        });

        return (
          <div
            key={time}
            className="
              rounded-2xl border p-3 min-h-[70px]
              flex flex-col justify-center items-center
              text-center
            "
          >
            {/* ВРЕМЯ (ВСЕГДА) */}
            <div className="text-sm font-semibold">{time}</div>

            {/* СОДЕРЖИМОЕ */}
            <div className="text-xs mt-1">
              {event ? (
                <span className="text-black font-medium">{event.activity}</span>
              ) : (
                <span className="text-gray-400">свободно</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
