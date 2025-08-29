import type { UserId } from './model';

export function isUserId(value: unknown): value is UserId {
  return typeof value === 'number';
}

export function unwrapUserId(id: UserId): number {
  return Number(id);
}

