// useUserCrud.ts — композиционный хук для CRUD операций над пользователем
// Почему: UI-состояние модалки и операции над стором в одном месте.
import { ref, type Ref } from 'vue'
import { useUsersStore } from '@/entities/user'
import type { User, UserId, CreateUserInput, UpdateUserInput } from '@/entities/user'
import type { UserFormValue } from './validation'
import { CRUD_MODES, type CrudMode } from './constants'

export function useUserCrud() {
  const store = useUsersStore()
  const isOpen = ref(false)
  const mode = ref<CrudMode | null>(null)
  const selected = ref<User | null>(null)
  const error = ref<string | null>(null)

  // Helper functions for payload conversion
  function toCreatePayload(form: UserFormValue): CreateUserInput {
    return {
      firstName: form.firstName,
      secondName: form.secondName,
      email: form.email,
      lastVisitedAt: form.lastVisitedAt
    }
  }

  function toUpdatePayload(id: UserId, form: Partial<UserFormValue>): UpdateUserInput {
    return {
      id,
      ...(form.firstName !== undefined && { firstName: form.firstName }),
      ...(form.secondName !== undefined && { secondName: form.secondName }),
      ...(form.email !== undefined && { email: form.email }),
      ...(form.lastVisitedAt !== undefined && { lastVisitedAt: form.lastVisitedAt })
    }
  }

  // Single entry point for opening modal
  function open(crudMode: CrudMode, user?: User) {
    if (crudMode === CRUD_MODES[0]) { // create
      selected.value = null
    } else if (crudMode === CRUD_MODES[1] && user) { // edit
      selected.value = user
    } else if (crudMode === CRUD_MODES[2] && user) { // delete
      selected.value = user
    } else {
      throw new Error(`Invalid mode: ${crudMode} or missing user for ${crudMode}`)
    }
    
    mode.value = crudMode
    isOpen.value = true
    error.value = null
  }

  function close() {
    isOpen.value = false
    mode.value = null
    selected.value = null
    error.value = null
  }

  // CRUD handlers
  async function submitCreate(form: UserFormValue) {
    try {
      const payload = toCreatePayload(form)
      await store.create(payload)
      close()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Create failed'
      throw e // Re-throw to let caller handle
    }
  }

  async function submitEdit(id: UserId, form: Partial<UserFormValue>) {
    try {
      const payload = toUpdatePayload(id, form)
      await store.update(id, payload)
      close()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Update failed'
      throw e // Re-throw to let caller handle
    }
  }

  async function confirmDelete(id: UserId) {
    try {
      await store.remove(id)
      close()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Delete failed'
      throw e // Re-throw to let caller handle
    }
  }

  return { 
    isOpen, 
    mode, 
    selected, 
    error, 
    open, 
    close, 
    submitCreate, 
    submitEdit, 
    confirmDelete 
  }
}

