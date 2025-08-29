import { z } from 'zod'

export const UserFormSchema = z.object({
  firstName: z.string().min(1, 'Имя обязательно для заполнения'),
  secondName: z.string().min(1, 'Фамилия обязательна для заполнения'),
  email: z.string().email('Некорректный email адрес'),
  lastVisitedAt: z.date({
    required_error: 'Дата последнего посещения обязательна',
    invalid_type_error: 'Некорректная дата'
  })
})

export type UserFormValue = z.infer<typeof UserFormSchema> 