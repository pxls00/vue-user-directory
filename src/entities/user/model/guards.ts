// guards.ts — тайп-гарды для доменных идентификаторов
import type { UserId } from './model';

export function isUserId(value: unknown): value is UserId {
  return typeof value === 'number';
}

export function unwrapUserId(id: UserId): number {
  return (id as unknown) as number;
}

