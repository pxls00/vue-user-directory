import type { User } from '../model/model';
import { USER_SEARCH_FIELDS, type UserSearchField } from '../model/constants';

export interface UserFilterParams {
  search: string;
  lastVisitedFrom?: Date;
  lastVisitedTo?: Date;
}

function normalize(s: string): string { 
  return s.trim().toLowerCase(); 
}

function userSearchText(u: User, fields: readonly UserSearchField[]): string {
  return fields.map(f => String(u[f] ?? '')).join(' ').toLowerCase();
}

export function applyFilters(list: readonly User[], p: UserFilterParams): User[] {
  const q = normalize(p.search);
  const from = p.lastVisitedFrom?.getTime();
  const to = p.lastVisitedTo?.getTime();
  
  return list.filter(u => {
    const hay = userSearchText(u, USER_SEARCH_FIELDS);
    const ts = u.lastVisitedAt.getTime();
    const matchQ = q === '' || hay.includes(q);
    const matchFrom = from == null || ts >= from;
    const matchTo = to == null || ts <= to;
    return matchQ && matchFrom && matchTo;
  });
}

