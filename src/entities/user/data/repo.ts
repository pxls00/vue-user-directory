import type { User } from '../model/model';
import type { UserDTO } from '../model/dto';
import { toUser } from '../model/mappers';
import { USER_STORAGE_KEY } from '../model/constants';
import { getJSON, setJSON } from '@/shared/storage/local';
import { unwrapUserId } from '../model/guards';

function toDTO(user: User): UserDTO {
  return {
    id: unwrapUserId(user.id),
    firstName: user.firstName,
    secondName: user.secondName,
    email: user.email,
    lastVisitedAt: user.lastVisitedAt.getTime(),
  };
}

export async function loadUsers(): Promise<User[]> {
  const cached = getJSON<UserDTO[] | null>(USER_STORAGE_KEY, null);
  if (cached) {
    return cached.map(toUser);
  }
  const res = await fetch('/userList.json');
  const data = (await res.json()) as UserDTO[];
  setJSON(USER_STORAGE_KEY, data);
  return data.map(toUser);
}

export function saveUsers(users: User[]): void {
  const dtos = users.map(toDTO);
  setJSON(USER_STORAGE_KEY, dtos);
}

