// constants.ts — доменные константы, типы и ключи хранения
export const USER_STORAGE_KEY = 'users.v1' as const;

export const USER_DEFAULT_PAGE_SIZE = 10 as const;

export const USER_SORT_KEYS = ['firstName','secondName','email','lastVisitedAt'] as const;
export type UserSortKey = typeof USER_SORT_KEYS[number];

export const USER_SEARCH_FIELDS = ['firstName','secondName','email'] as const;
export type UserSearchField = typeof USER_SEARCH_FIELDS[number];

export const USER_DEFAULT_SORT: Readonly<{ key: UserSortKey; dir: 'asc'|'desc' }> =
  { key: 'lastVisitedAt', dir: 'desc' } as const;

// UI константы
export const USER_TABLE_COLUMNS = ['firstName','secondName','email','lastVisitedAt'] as const;
export type UserTableColumn = typeof USER_TABLE_COLUMNS[number];

export const USER_FORM_FIELDS = ['firstName','secondName','email','lastVisitedAt'] as const;
export type UserFormField = typeof USER_FORM_FIELDS[number];

