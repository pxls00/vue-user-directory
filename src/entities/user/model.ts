// model.ts — доменная модель. Почему: домен отделён от транспорта для удобства форматирования/сортировки.
export type Brand<T, B extends string> = T & { __brand: B };
export type UserId = Brand<number, 'UserId'>;

export type User = {
  id: UserId;
  firstName: string;
  secondName: string;
  email: string;
  lastVisitedAt: Date;
};

