// sorters.ts — компараторы сортировки пользователей.
import type { User } from '../model/model';
import { unwrapUserId } from '../model/guards';
import type { UserSortKey, SortDir } from '../model/constants';

export type UserSorter = (a: User, b: User) => number;

function compareById(a: User, b: User): number {
  return unwrapUserId(a.id) - unwrapUserId(b.id);
}

export const sorters: Record<UserSortKey, UserSorter> = {
  firstName: (a, b) => a.firstName.localeCompare(b.firstName, undefined, { sensitivity: 'base' }),
  secondName: (a, b) => a.secondName.localeCompare(b.secondName, undefined, { sensitivity: 'base' }),
  email: (a, b) => a.email.localeCompare(b.email, undefined, { sensitivity: 'base' }),
  lastVisitedAt: (a, b) => a.lastVisitedAt.getTime() - b.lastVisitedAt.getTime(),
};

export function applySort(users: User[], key: UserSortKey, dir: SortDir): User[] {
  const mul = dir === 'asc' ? 1 : -1;
  const cmpKey = sorters[key];
  return [...users].sort((a, b) => {
    let cmp = cmpKey(a, b);
    if (cmp === 0) {
      cmp = compareById(a, b);
    }
    return cmp * mul;
  });
}

