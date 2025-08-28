// useUserSearch.ts — композиционный хук для поиска пользователей.
// Почему: инкапсуляция синхронизации UI ввода и стора с дебаунсом.
import { computed, ref } from 'vue';
import { useUsersStore } from '@/entities/user';
import { debounce } from '@/shared/lib/debounce';

export function useUserSearch() {
  const store = useUsersStore();
  const input = ref<string>(store.search);

  const apply = debounce((value: string) => {
    store.search = value;
  }, 300);

  const query = computed({
    get: () => input.value,
    set: (v: string) => {
      input.value = v;
      apply(v);
    },
  });

  function clear() {
    query.value = '';
  }

  return { query, clear };
}

