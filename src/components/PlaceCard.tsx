import { Link } from 'react-router-dom';

type Props = {
  place: {
    id: string;
    title: string;
    image: string;
    category: string;
  };
};

export default function PlaceCard({ place }: Props) {
  const categoryLabel = place.category === 'auditory' ? 'АУДИТОРИИ' : 'СПОРТ';

  return (
    <div className="rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300">
      {/* IMAGE */}
      <div className="relative h-32 md:h-40">
        <img
          src={place.image}
          alt={place.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* CATEGORY BADGE */}
        <div className="absolute top-2 left-2 px-3 py-1 rounded-xl text-xs font-black uppercase bg-black/60 text-white backdrop-blur">
          {categoryLabel}
        </div>
      </div>

      {/* TITLE */}
      <div className="p-3">
        <div className="text-sm font-black uppercase text-black leading-snug">
          {place.title}
        </div>
      </div>
    </div>
  );
}
