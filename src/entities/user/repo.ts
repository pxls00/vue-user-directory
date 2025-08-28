// repo.ts — источник данных пользователей. Почему: изолируем доступ к данным и формат хранения.
import type { User } from './model';
import type { UserDTO } from './dto';
import { toUser } from './mappers';
import { getJSON, setJSON } from '@/shared/storage/local';

const STORAGE_KEY = 'users.v1';

function toDTO(user: User): UserDTO {
  return {
    id: (user.id as unknown as number),
    firstName: user.firstName,
    secondName: user.secondName,
    email: user.email,
    lastVisitedAt: user.lastVisitedAt.getTime(),
  };
}

export async function loadUsers(): Promise<User[]> {
  const cached = getJSON<UserDTO[] | null>(STORAGE_KEY, null);
  if (cached) {
    return cached.map(toUser);
  }
  const res = await fetch('/userList.json');
  const data = (await res.json()) as UserDTO[];
  setJSON(STORAGE_KEY, data);
  return data.map(toUser);
}

export function saveUsers(users: User[]): void {
  const dtos = users.map(toDTO);
  setJSON(STORAGE_KEY, dtos);
}

