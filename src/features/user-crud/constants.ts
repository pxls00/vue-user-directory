export const USER_FORM_FIELDS = [
  'firstName',
  'secondName', 
  'email',
  'lastVisitedAt'
] as const

export type UserFormField = typeof USER_FORM_FIELDS[number]

export const CRUD_MODES = ['create', 'edit', 'delete'] as const

export type CrudMode = typeof CRUD_MODES[number] 