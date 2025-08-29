import { defineStore } from 'pinia';
import type { User, UserId, CreateUserInput, UpdateUserInput } from './model/model';
import { loadUsers, saveUsers } from './data/repo';
import { applyFilters, type UserFilterParams } from './logic/filters';
import { applySort } from './logic/sorters';
import { USER_DEFAULT_PAGE_SIZE, USER_DEFAULT_SORT, type UserSortKey, type SortDir } from './model/constants';
import { paginateUsers } from './logic/pagination';
import { computeNextUserId, buildUser, updateUserIn, removeUserFrom } from './logic/builders';

export type UsersSortKey = UserSortKey;

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [] as User[],
    isLoading: false,
    
    search: '',
    filters: {
      lastVisitedFrom: undefined as Date | undefined,
      lastVisitedTo: undefined as Date | undefined,
    },
    sort: {
      key: USER_DEFAULT_SORT.key,
      dir: USER_DEFAULT_SORT.dir,
    },
    page: 1,
    pageSize: USER_DEFAULT_PAGE_SIZE as number,
  }),
  
  getters: {
    filteredUsers(state): User[] {
      const params: UserFilterParams = {
        search: state.search,
        lastVisitedFrom: state.filters.lastVisitedFrom,
        lastVisitedTo: state.filters.lastVisitedTo,
      };
      return applyFilters(state.users, params);
    },
    
    sortedUsers(state): User[] {
      const params: UserFilterParams = {
        search: state.search,
        lastVisitedFrom: state.filters.lastVisitedFrom,
        lastVisitedTo: state.filters.lastVisitedTo,
      };
      const filtered = applyFilters(state.users, params);
      return applySort(filtered, state.sort.key, state.sort.dir);
    },
    
    pagedUsers(state) {
      const params: UserFilterParams = {
        search: state.search,
        lastVisitedFrom: state.filters.lastVisitedFrom,
        lastVisitedTo: state.filters.lastVisitedTo,
      };
      const filtered = applyFilters(state.users, params);
      const sorted = applySort(filtered, state.sort.key, state.sort.dir);
      return paginateUsers(sorted, state.page, state.pageSize);
    },
    
    total(state): number {
      const params: UserFilterParams = {
        search: state.search,
        lastVisitedFrom: state.filters.lastVisitedFrom,
        lastVisitedTo: state.filters.lastVisitedTo,
      };
      return applyFilters(state.users, params).length;
    },
  },
  
  actions: {
    async init(): Promise<void> {
      this.isLoading = true;
      try {
        this.users = await loadUsers();
      } finally {
        this.isLoading = false;
      }
    },
    
    async create(userInput: CreateUserInput): Promise<void> {
      const id = computeNextUserId(this.users);
      const user = buildUser(id, userInput);
      this.users = [...this.users, user];
      await saveUsers(this.users);
    },
    
    async update(userId: UserId, patch: UpdateUserInput): Promise<void> {
      this.users = updateUserIn(this.users, userId, patch);
      await saveUsers(this.users);
    },
    
    async remove(userId: UserId): Promise<void> {
      this.users = removeUserFrom(this.users, userId);
      await saveUsers(this.users);
    },
    
    setSearch(value: string): void {
      this.search = value;
      this.page = 1;
    },
    
    setFilters(filters: { lastVisitedFrom?: Date; lastVisitedTo?: Date }): void {
      this.filters.lastVisitedFrom = filters.lastVisitedFrom;
      this.filters.lastVisitedTo = filters.lastVisitedTo;
      this.page = 1;
    },
    
    setSort(key: UsersSortKey, dir: SortDir): void {
      this.sort = { key, dir };
      this.page = 1;
    },
    
    setPage(page: number): void {
      this.page = page;
    },
    
    setPageSize(pageSize: number): void {
      this.pageSize = Math.max(1, Math.min(pageSize, 100));
      this.page = 1;
    },
  },
});

