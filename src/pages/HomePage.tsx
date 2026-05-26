import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';

import PlaceCard from '../components/PlaceCard';
import { places } from '../data/places';

type Filter =
  | 'all'
  | 'football'
  | 'basketball'
  | 'volleyball'
  | 'halls'
  | 'auditory';

const filters: { key: Filter; label: string }[] = [
  { key: 'all', label: 'ВСЁ' },
  { key: 'football', label: 'ФУТБОЛ' },
  { key: 'basketball', label: 'БАСКЕТБОЛ' },
  { key: 'volleyball', label: 'ВОЛЕЙБОЛ' },
  { key: 'halls', label: 'ЗАЛЫ' },
  { key: 'auditory', label: 'АУДИТОРИИ' },
];

export default function HomePage() {
  const [filter, setFilter] = useState<Filter>('all');

  const filteredPlaces = useMemo(() => {
    if (filter === 'all') return places;
    return places.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="mx-auto max-w-[1600px]">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-black">
            ПЛОЩАДКИ
          </h1>
          <p className="mt-2 text-zinc-500">
            Бронирование — отдел реализации (менеджер Анастасия),
            административный корпус
          </p>
        </div>

        {/* FILTERS */}
        <div className="mb-6 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`
                px-4 py-2 rounded-2xl text-sm font-bold uppercase tracking-wide
                transition-all duration-200
                backdrop-blur-md border

                ${
                  filter === f.key
                    ? 'bg-black text-white border-black shadow-lg scale-[1.02]'
                    : 'bg-white/60 text-black border-zinc-200 hover:bg-white'
                }
              `}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* GRID (ПЛИТКА) */}
        <div
          className="
            grid
            grid-cols-2
            md:grid-cols-3
            xl:grid-cols-4
            gap-4
          "
        >
          {filteredPlaces.map((place) => (
            <Link key={place.id} to={`/place/${place.id}`}>
              <PlaceCard place={place} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
