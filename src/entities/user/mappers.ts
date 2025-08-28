// mappers.ts — преобразования границы DTO→Domain. Почему: не пускаем «сырой» формат в приложение.
import type { UserDTO } from './dto';
import type { User, UserId } from './model';

function brandUserId(id: number): UserId {
  return id as UserId;
}

export function toUser(dto: UserDTO): User {
  // console.log(dto);
  // debugger;
  return {
    id: brandUserId(dto.id),
    firstName: dto.firstName.trim(),
    secondName: dto.secondName.trim(),
    email: dto.email.trim(),
    lastVisitedAt: new Date(dto.lastVisitedAt),
  };
}

