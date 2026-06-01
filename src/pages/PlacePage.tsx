import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { places } from '../data/places';
import { getSchedule } from '../services/scheduleApi';

import type { ScheduleItem } from '../types/schedule';

const DEFAULT_TIME_SLOTS = [
  '07:00-07:30',
  '07:30-08:00',
  '08:00-08:30',
  '08:30-09:00',
  '09:00-09:30',
  '09:30-10:00',
  '10:00-10:30',
  '10:30-11:00',
  '11:00-11:30',
  '11:30-12:00',
  '12:00-12:30',
  '12:30-13:00',
  '13:00-13:30',
  '13:30-14:00',
  '14:00-14:30',
  '14:30-15:00',
  '15:00-15:30',
  '15:30-16:00',
  '16:00-16:30',
  '16:30-17:00',
  '17:00-17:30',
  '17:30-18:00',
  '18:00-18:30',
  '18:30-19:00',
  '19:00-19:30',
  '19:30-20:00',
  '20:00-20:30',
  '20:30-21:00',
  '21:00-21:30',
  '21:30-22:00',
];

const GYM_7K_TIME_SLOTS = [
  '07:00-07:30',
  '07:30-08:00',
  '08:00-08:30',
  '08:30-09:00',
  '09:00-09:30',
  '09:30-10:00',
  '10:15-10:30',
  '10:30-11:00',
  '11:00-11:15',
  '11:15-12:00',
  '12:00-12:30',
  '12:30-13:00',
  '13:00-13:15',
  '13:15-14:00',
  '14:00-14:30',
  '14:30-15:00',
  '15:00-15:30',
  '15:30-16:00',
  '16:00-16:30',
  '16:30-17:00',
  '17:00-17:45',
  '17:45-18:00',
  '18:00-18:30',
  '18:30-18:45',
  '18:45-19:15',
  '19:15-20:00',
  '20:00-20:30',
  '20:30-21:00',
  '21:00-21:30',
  '21:30-22:00',
];

const MONTHS = [
  'ЯНВАРЯ',
  'ФЕВРАЛЯ',
  'МАРТА',
  'АПРЕЛЯ',
  'МАЯ',
  'ИЮНЯ',
  'ИЮЛЯ',
  'АВГУСТА',
  'СЕНТЯБРЯ',
  'ОКТЯБРЯ',
  'НОЯБРЯ',
  'ДЕКАБРЯ',
];

function normalize(str: any) {
  return String(str ?? '')
    .trim()
    .toLowerCase();
}

function normalizeTime(t: string) {
  const value = String(t ?? '').trim();

  const parts = value.split(':');

  const hours = parts[0]?.padStart(2, '0') ?? '00';
  const minutes = parts[1]?.padStart(2, '0') ?? '00';

  return `${hours}:${minutes}`;
}

function timeToMinutes(time: string) {
  const [h, m] = time.split(':').map(Number);

  return h * 60 + m;
}

function findEvent(slot: string, events: ScheduleItem[]) {
  const [slotStart, slotEnd] = slot.split('-');

  const slotStartMin = timeToMinutes(slotStart);
  const slotEndMin = timeToMinutes(slotEnd);

  return events.find((e) => {
    const eStart = normalizeTime(e.start);
    const eEnd = normalizeTime(e.end);

    const eStartMin = timeToMinutes(eStart);
    const eEndMin = timeToMinutes(eEnd);

    return (
      slotStartMin >= eStartMin &&
      slotEndMin <= eEndMin
    );
  });
}

function formatDateLabel(date: Date, i: number) {
  if (i === 0) return 'СЕГОДНЯ';
  if (i === 1) return 'ЗАВТРА';

  const day = date.getDate();
  const month = MONTHS[date.getMonth()];

  return `${day} ${month}`;
}

export default function PlacePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const place = places.find((p) => p.id === id);

  const timeSlots =
  place?.id === 'trenazzal-7k'
    ? GYM_7K_TIME_SLOTS
    : DEFAULT_TIME_SLOTS;

  const today = new Date();

  const days = useMemo(() => {
    return Array.from({ length: 4 }, (_, i) => {
      const d = new Date();
      d.setDate(today.getDate() + i);

      return {
        label: formatDateLabel(d, i),
        value: d.toISOString().split('T')[0],
      };
    });
  }, []);

  const [selectedDate, setSelectedDate] = useState(days[0].value);
  const [events, setEvents] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      if (!place) return;

      setLoading(true);

      const data = await getSchedule();

      const filtered = data.filter((e) => {
        return (
          normalize(e.place) === normalize(place.sheetName) &&
          e.date === selectedDate
        );
      });

      setEvents(filtered);
      setLoading(false);
    }

    load();
  }, [place, selectedDate]);

  if (!place) {
    return (
      <div className="min-h-screen bg-vita-bg p-6">
        <h1 className="text-3xl font-black uppercase text-vita-dark">
          ПЛОЩАДКА НЕ НАЙДЕНА
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-vita-bg p-6">
      <div className="mx-auto max-w-[1400px]">
        {/* HEADER */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="mb-5 rounded-2xl bg-white px-5 py-3 text-sm font-black uppercase text-vita-dark shadow-lg hover:scale-105 transition"
          >
            ← НАЗАД
          </button>

          <h1 className="text-5xl font-black uppercase text-vita-dark">
            {place.title}
          </h1>

          <p className="mt-3 text-zinc-500">РАСПИСАНИЕ ПЛОЩАДКИ</p>
        </div>

        {/* DAYS */}
        <div className="mb-8 flex gap-3 overflow-x-auto pb-2">
          {days.map((d) => {
            const active = selectedDate === d.value;

            return (
              <button
                key={d.value}
                onClick={() => setSelectedDate(d.value)}
                className={`
                  whitespace-nowrap
                  rounded-2xl
                  px-6
                  py-4
                  text-sm
                  font-black
                  uppercase
                  tracking-wide
                  transition-all
                  duration-300
                  flex items-center gap-2

                  ${
                    active
                      ? 'bg-vita-orange text-white shadow-xl scale-105'
                      : 'bg-white text-vita-dark shadow-md hover:shadow-lg hover:bg-orange-50'
                  }
                `}
              >
                {active && (
                  <span className="h-2 w-2 rounded-full bg-orange-300 animate-pulse" />
                )}
                {d.label}
              </button>
            );
          })}
        </div>

        {/* LOADING */}
        {loading && (
          <div className="mb-6 rounded-3xl bg-gradient-to-r from-orange-500 to-orange-400 p-8 shadow-2xl relative overflow-hidden">
            {/* glow */}
            <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/30 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/20 blur-3xl" />

            <div className="relative z-10 flex items-center gap-4">
              {/* spinner */}
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/30 border-t-white" />

              {/* text */}
              <div>
                <div className="text-white text-xl font-black uppercase tracking-widest">
                  ЗАГРУЗКА
                </div>

                <div className="text-white/80 text-sm font-semibold">
                  Получаем расписание площадки...
                </div>
              </div>
            </div>
          </div>
        )}
        {/* TIMELINE */}
        <div className="space-y-4">
        {timeSlots.map((slot) => {
            const [start, end] = slot.split('-');
            const event = findEvent(slot, events);

            return (
              <div
                key={slot}
                className={`
                  group relative overflow-hidden rounded-[32px] border border-white/40 p-5 shadow-lg backdrop-blur-xl transition-all duration-300
                  hover:-translate-y-[2px]

                  ${
                    event
                      ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white'
                      : 'bg-white text-zinc-700'
                  }
                `}
              >
                {event && (
                  <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/20 blur-3xl" />
                )}

                <div className="relative z-10 flex items-center justify-between">
                  {/* TIME */}
                  <div>
                    <div
                      className={`text-sm font-black uppercase tracking-widest ${
                        event ? 'text-white/70' : 'text-zinc-400'
                      }`}
                    >
                      ВРЕМЯ
                    </div>

                    <div className="mt-1 text-2xl font-black">
                      {start} — {end}
                    </div>
                  </div>

                  {/* STATUS */}
                  <div className="text-right">
                    <div
                      className={`text-sm font-black uppercase tracking-widest ${
                        event ? 'text-white/70' : 'text-green-500'
                      }`}
                    >
                      {event ? 'ЗАНЯТО' : 'СВОБОДНО'}
                    </div>

                    <div className="mt-1 text-xl font-black uppercase">
                      {event ? event.activity : ''}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
