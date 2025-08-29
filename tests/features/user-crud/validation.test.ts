import { UserFormSchema } from '@/features/user-crud/validation'

it('accepts correct payload', () => {
  const ok = UserFormSchema.parse({
    firstName: 'Ada',
    secondName: 'Lovelace',
    email: 'ada@math.org',
    lastVisitedAt: new Date(),
  })
  expect(ok.firstName).toBe('Ada')
})

it('rejects invalid email', () => {
  expect(() =>
    UserFormSchema.parse({ firstName:'x', secondName:'y', email:'nope', lastVisitedAt:new Date() })
  ).toThrow()
}) 