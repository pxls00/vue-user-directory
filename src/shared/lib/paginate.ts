export interface PageSlice<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export function paginate<T>(all: readonly T[], page: number, pageSize: number): PageSlice<T> {
  const total = all.length;
  const safePageSize = Math.max(1, Math.floor(pageSize));
  const maxPage = Math.max(1, Math.ceil(total / safePageSize));
  const safePage = Math.min(Math.max(1, Math.floor(page)), maxPage);
  const start = (safePage - 1) * safePageSize;
  const end = start + safePageSize;
  const items = all.slice(start, end);
  return { items, total, page: safePage, pageSize: safePageSize };
}

