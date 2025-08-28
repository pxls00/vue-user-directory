// pagination.ts — тонкая доменная обёртка над shared пагинацией
import { paginate, type PageSlice } from '@/shared/lib/paginate';
import type { User } from '../model/model';

export function paginateUsers(all: readonly User[], page: number, pageSize: number): PageSlice<User> {
  return paginate(all, page, pageSize);
}

