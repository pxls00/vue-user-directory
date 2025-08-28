// sorters.ts — компараторы сортировки пользователей.
// Почему: чистые функции, стабильная сортировка с фолбэком по id.
import type { User } from './model.ts';

export type UserSortKey = 'firstName'|'secondName'|'email'|'lastVisitedAt';
export type UserSorter = (a: User, b: User) => number;

export const sorters: Record<UserSortKey, UserSorter> = {
  firstName: (a, b) => a.firstName.localeCompare(b.firstName, undefined, { sensitivity: 'base' }),
  secondName: (a, b) => a.secondName.localeCompare(b.secondName, undefined, { sensitivity: 'base' }),
  email: (a, b) => a.email.localeCompare(b.email, undefined, { sensitivity: 'base' }),
  lastVisitedAt: (a, b) => a.lastVisitedAt.getTime() - b.lastVisitedAt.getTime(),
};

export function applySort(users: User[], key: UserSortKey, dir: 'asc'|'desc'): User[] {
  const mul = dir === 'asc' ? 1 : -1;
  const cmpKey = sorters[key];
  return [...users].sort((a, b) => {
    let cmp = cmpKey(a, b);
    if (cmp === 0) {
      const aid = a.id as unknown as number;
      const bid = b.id as unknown as number;
      cmp = aid - bid;
    }
    return cmp * mul;
  });
}

