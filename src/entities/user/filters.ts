// filters.ts — предикаты/фильтры для пользователей.
// Почему: чистые функции, переиспользуемые в сторах и компонентах.
import type { User } from './model.ts';

export type UserFilter = (user: User) => boolean;

export function applyFilters(
  users: User[],
  params: { search: string; filters: { lastVisitedFrom?: Date; lastVisitedTo?: Date } }
): User[] {
  const q = params.search.trim().toLowerCase();
  const from = params.filters.lastVisitedFrom?.getTime();
  const to = params.filters.lastVisitedTo?.getTime();
  return users.filter(u => {
    const matchesQuery = q.length === 0 || `${u.firstName} ${u.secondName} ${u.email}`.toLowerCase().includes(q);
    const ts = u.lastVisitedAt.getTime();
    const afterFrom = from == null || ts >= from;
    const beforeTo = to == null || ts <= to;
    return matchesQuery && afterFrom && beforeTo;
  });
}

