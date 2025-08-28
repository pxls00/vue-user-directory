// store.ts — Pinia-стор пользователей.
// Почему: централизуем данные и UI-состояние, а также применяем фильтрацию/сортировку/пагинацию.
import { defineStore } from 'pinia';
import type { User, UserId } from './model.ts';
import { loadUsers, saveUsers } from './repo';
import { applyFilters } from './filters.ts';
import { applySort, type UserSortKey } from './sorters.ts';
import { paginate } from './paginate.ts';

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
    sort: { key: 'lastVisitedAt' as UsersSortKey, dir: 'desc' as SortDir },
    page: 1,
    pageSize: 10,
  }),
  getters: {
    filteredUsers(state): User[] {
      return applyFilters(state.users, { search: state.search, filters: state.filters });
    },
    sortedUsers(state): User[] {
      return applySort(this.filteredUsers, state.sort.key, state.sort.dir);
    },
    pagedUsers(state): { items: User[]; total: number; page: number; pageSize: number } {
      return paginate(this.sortedUsers, state.page, state.pageSize);
    },
  },
  actions: {
    async init(): Promise<void> {
      const loaded = await loadUsers();
      this.users = loaded;
      // значения sort/page уже по умолчанию в state
    },
    async create(userInput: Omit<User, 'id'> & { id?: UserId }): Promise<void> {
      // Для простоты: сгенерируем временный id как max+1
      const nextId = (this.users.reduce((m, u) => Math.max(m, (u.id as unknown as number)), 0) + 1) as unknown as UserId;
      const user: User = { id: (userInput.id ?? nextId) as UserId, ...userInput, lastVisitedAt: userInput.lastVisitedAt } as User;
      this.users = [...this.users, user];
      saveUsers(this.users);
    },
    async update(userId: UserId, patch: Partial<User>): Promise<void> {
      this.users = this.users.map(u => (u.id === userId ? { ...u, ...patch } : u));
      saveUsers(this.users);
    },
    async remove(userId: UserId): Promise<void> {
      this.users = this.users.filter(u => u.id !== userId);
      saveUsers(this.users);
    },
  },
});

