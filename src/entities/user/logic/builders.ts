// builders.ts — чистые функции для построения и изменения пользователей
import { makeUserId, type User, type UserBase, type UserId } from '../model/model';
import { unwrapUserId } from '../model/guards';

export function computeNextUserId(list: readonly User[]): UserId {
  const max = list.reduce<number>((m, u) => Math.max(m, unwrapUserId(u.id)), 0);
  return makeUserId(max + 1);
}

export function buildUser(id: UserId, base: UserBase): User {
  return { id, ...base };
}

export function updateUserIn(list: readonly User[], id: UserId, patch: Partial<UserBase>): User[] {
  return list.map(u => (u.id === id ? { ...u, ...patch } : u));
}

export function removeUserFrom(list: readonly User[], id: UserId): User[] {
  return list.filter(u => u.id !== id);
} 