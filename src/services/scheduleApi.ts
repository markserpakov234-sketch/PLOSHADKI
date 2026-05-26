import type { ScheduleItem } from '../types/schedule';

const API_URL =
  'https://script.google.com/macros/s/AKfycby47zhHsKuU-bpgnHRYS3kHBFDmr1oN4UveHzSsRK0vDs9sDu4zqbGDK6lInppsNaen/exec';

// 🔥 кэш
let cache: ScheduleItem[] | null = null;

// 🔥 текущий запрос
let promise: Promise<ScheduleItem[]> | null = null;

// 🔥 время последней загрузки
let lastFetch = 0;

// 🔥 кеш живёт 5 минут
const CACHE_TIME = 1000 * 60 * 5;

export async function getSchedule(): Promise<ScheduleItem[]> {
  const now = Date.now();

  // ✅ если кеш свежий
  if (cache && now - lastFetch < CACHE_TIME) {
    return cache;
  }

  // ✅ если уже идёт запрос
  if (promise) {
    return promise;
  }

  promise = fetch(API_URL)
    .then(async (res) => {
      if (!res.ok) {
        throw new Error('Ошибка загрузки');
      }

      const data = await res.json();

      cache = data;
      lastFetch = Date.now();

      promise = null;

      return data;
    })
    .catch((err) => {
      promise = null;
      throw err;
    });

  return promise;
}

// 🔥 ручной сброс
export function clearScheduleCache() {
  cache = null;
  promise = null;
  lastFetch = 0;
}
