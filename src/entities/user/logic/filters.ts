// filters.ts — предикаты/фильтры для пользователей.
import type { User } from '../model/model';
import { USER_SEARCH_FIELDS } from '../model/constants';

export type UserFilter = (user: User) => boolean;

export function applyFilters(
  users: User[],
  params: { search: string; filters: { lastVisitedFrom?: Date; lastVisitedTo?: Date } }
): User[] {
  const q = params.search.trim().toLowerCase();
  const from = params.filters.lastVisitedFrom?.getTime();
  const to = params.filters.lastVisitedTo?.getTime();
  return users.filter(u => {
    const haystack = USER_SEARCH_FIELDS.map(field => String(u[field])).join(' ').toLowerCase();
    const matchesQuery = q.length === 0 || haystack.includes(q);
    const ts = u.lastVisitedAt.getTime();
    const afterFrom = from == null || ts >= from;
    const beforeTo = to == null || ts <= to;
    return matchesQuery && afterFrom && beforeTo;
  });
}

