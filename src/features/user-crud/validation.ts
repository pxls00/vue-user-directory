import { z } from 'zod'

export const UserFormSchema = z.object({
  firstName: z.string().min(1, 'Имя обязательно для заполнения'),
  secondName: z.string().min(1, 'Фамилия обязательна для заполнения'),
  email: z.string().email('Некорректный email адрес'),
  lastVisitedAt: z.date('Некорректная дата')
})

export type UserFormValue = z.infer<typeof UserFormSchema> 