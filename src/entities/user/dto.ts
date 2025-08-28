// dto.ts — транспортный слой. Почему: отделяем «сырые» формы данных от домена.
export type UserDTO = {
  id: number;
  firstName: string;
  secondName: string;
  email: string;
  lastVisitedAt: number; // timestamp
};

