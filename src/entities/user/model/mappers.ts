// mappers.ts — преобразования DTO→Domain.
import type { UserDTO } from './dto';
import type { User } from './model';
import { makeUserId } from './model';

export function toUser(dto: UserDTO): User {
  return {
    id: makeUserId(dto.id),
    firstName: dto.firstName.trim(),
    secondName: dto.secondName.trim(),
    email: dto.email.trim(),
    lastVisitedAt: new Date(dto.lastVisitedAt),
  };
}

