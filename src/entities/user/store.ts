// store.ts — Pinia-стор пользователей.
// Почему: централизуем данные и UI-состояние, а также применяем фильтрацию/сортировку/пагинацию.
import { defineStore } from 'pinia';
import type { User, UserId, CreateUserInput, UpdateUserInput } from './model/model';
import { loadUsers, saveUsers } from './data/repo';
import { applyFilters } from './logic/filters';
import { applySort } from './logic/sorters';
import { USER_DEFAULT_PAGE_SIZE, USER_DEFAULT_SORT, type UserSortKey } from './model/constants';
import { paginateUsers } from './logic/pagination';
import { computeNextUserId, buildUser, updateUserIn, removeUserFrom } from './logic/builders';

export type UsersSortKey = UserSortKey;
export type SortDir = 'asc' | 'desc';

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [] as User[],
    search: '' as string,
    filters: {
      lastVisitedFrom: undefined as Date | undefined,
      lastVisitedTo: undefined as Date | undefined,
    },
    sort: { key: USER_DEFAULT_SORT.key as UsersSortKey, dir: USER_DEFAULT_SORT.dir as SortDir },
    page: 1,
    pageSize: USER_DEFAULT_PAGE_SIZE,
  }),
  getters: {
    filteredUsers(state): User[] {
      return applyFilters(state.users, { search: state.search, filters: state.filters });
    },
    sortedUsers(state): User[] {
      return applySort(this.filteredUsers, state.sort.key, state.sort.dir);
    },
    pagedUsers(state): { items: User[]; total: number; page: number; pageSize: number } {
      return paginateUsers(this.sortedUsers, state.page, state.pageSize);
    },
  },
  actions: {
    async init(): Promise<void> {
      const loaded = await loadUsers();
      this.users = loaded;
      // значения sort/page уже по умолчанию в state
    },
    async create(userInput: CreateUserInput): Promise<void> {
      const id = computeNextUserId(this.users);
      const user = buildUser(id, userInput);
      this.users = [...this.users, user];
      saveUsers(this.users);
    },
    async update(userId: UserId, patch: UpdateUserInput): Promise<void> {
      this.users = updateUserIn(this.users, userId, patch);
      saveUsers(this.users);
    },
    async remove(userId: UserId): Promise<void> {
      this.users = removeUserFrom(this.users, userId);
      saveUsers(this.users);
    },
  },
});

