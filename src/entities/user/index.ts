// index.ts — публичный API сущности user (сужён до необходимых типов/функций)
export type { UserDTO } from './dto.ts';
export type { User, UserId } from './model.ts';
export { toUser } from './mappers.ts';
export { loadUsers, saveUsers } from './repo';
export { useUsersStore } from './store';

