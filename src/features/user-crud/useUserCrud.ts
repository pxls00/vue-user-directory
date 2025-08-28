// useUserCrud.ts — композиционный хук для CRUD операций над пользователем
// Почему: UI-состояние модалки и операции над стором в одном месте.
import { ref } from 'vue';
import { useUsersStore } from '@/entities/user/store';
import type { User, UserId } from '@/entities/user';

type FormInput = Pick<User, 'firstName'|'secondName'|'email'|'lastVisitedAt'>;

export function useUserCrud() {
  const store = useUsersStore();
  const isOpen = ref(false);
  const mode = ref<'create'|'edit'|'delete'|null>(null);
  const selected = ref<User | null>(null);
  const error = ref<string | null>(null);

  function openCreate() {
    mode.value = 'create';
    selected.value = null;
    isOpen.value = true;
  }

  function openEdit(user: User) {
    mode.value = 'edit';
    selected.value = user;
    isOpen.value = true;
  }

  function close() {
    isOpen.value = false;
    mode.value = null;
    selected.value = null;
    error.value = null;
  }

  async function submitCreate(form: FormInput) {
    try {
      await store.create({ ...form });
      close();
    } catch (e) {
      error.value = (e as Error).message ?? 'Create failed';
    }
  }

  async function submitEdit(id: UserId, form: Partial<FormInput>) {
    try {
      await store.update(id, { ...form });
      close();
    } catch (e) {
      error.value = (e as Error).message ?? 'Update failed';
    }
  }

  async function confirmDelete(id: UserId) {
    try {
      await store.remove(id);
      close();
    } catch (e) {
      error.value = (e as Error).message ?? 'Delete failed';
    }
  }

  return { isOpen, mode, selected, error, openCreate, openEdit, close, submitCreate, submitEdit, confirmDelete };
}

