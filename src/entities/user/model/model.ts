export type Brand<T, B extends string> = T & { __brand: B };
export type UserId = Brand<number, 'UserId'>;

export function makeUserId(n: number): UserId { 
  return n as UserId;
}

export interface UserBase { 
  firstName: string; 
  secondName: string; 
  email: string; 
  lastVisitedAt: Date; 
}

export interface User extends UserBase { 
  id: UserId; 
}

export interface CreateUserInput extends UserBase {}

export interface UpdateUserInput extends Partial<UserBase> { 
  id: UserId; 
}

