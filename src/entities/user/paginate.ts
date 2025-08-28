// paginate.ts — утилиты пагинации коллекций пользователей.
// Почему: чистые функции, легко тестировать и переиспользовать.
import type { User } from './model.ts';

export type Page<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
};

export function paginate(users: User[], page: number, pageSize: number): Page<User> {
  const total = users.length;
  const maxPage = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), maxPage);
  const start = (safePage - 1) * pageSize;
  const end = start + pageSize;
  return { items: users.slice(start, end), total, page: safePage, pageSize };
}

