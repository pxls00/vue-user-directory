import type { SortDir, UserSortKey } from '@/entities/user'

export interface SortState { key: UserSortKey; dir: SortDir  }

export function useSortToggle(current: () => SortState) {
  function nextFor(key: UserSortKey): SortState {
    const prev = current()
    if (prev.key !== key) return { key, dir: 'asc' }
    return { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' }
  }

  function headerAttrs(key: UserSortKey) {
    const s = current()
    return {
      'data-sortable': true,
      'data-sorted': s.key === key || undefined,
      'data-dir': s.key === key ? s.dir : undefined,
    } as const
  }

  return { nextFor, headerAttrs }
} 