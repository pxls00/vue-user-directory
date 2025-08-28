// index.ts — публичный API сущности user (контракт)
export type { User, UserId, CreateUserInput, UpdateUserInput } from './model/model';
export { makeUserId } from './model/model';
export { isUserId, unwrapUserId } from './model/guards';
export { toUser } from './model/mappers';
export { USER_STORAGE_KEY, USER_DEFAULT_PAGE_SIZE, USER_SORT_KEYS, type UserSortKey, USER_SEARCH_FIELDS, type UserSearchField, USER_DEFAULT_SORT } from './model/constants';
export { applyFilters } from './logic/filters';
export { applySort } from './logic/sorters';
export { paginateUsers } from './logic/pagination';
export { computeNextUserId, buildUser, updateUserIn, removeUserFrom } from './logic/builders';
export { loadUsers, saveUsers } from './data/repo';
export { useUsersStore } from './store';

