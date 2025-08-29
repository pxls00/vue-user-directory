// index.ts — публичный API сущности user (контракт)
// model
export { type User, type UserId, type UserBase, type CreateUserInput, type UpdateUserInput, makeUserId } from './model/model';
export { USER_STORAGE_KEY, USER_DEFAULT_PAGE_SIZE, USER_SORT_KEYS, type UserSortKey, USER_SEARCH_FIELDS, type UserSearchField, USER_DEFAULT_SORT } from './model/constants';
export { isUserId, unwrapUserId } from './model/guards';
export { toUser } from './model/mappers';

// logic
export { applyFilters, type UserFilterParams } from './logic/filters';
export { applySort } from './logic/sorters';
export { paginateUsers } from './logic/pagination';
export * from './logic/builders';

// data
export * from './data/repo';

// store
export { useUsersStore, type UsersSortKey, type SortDir } from './store';

