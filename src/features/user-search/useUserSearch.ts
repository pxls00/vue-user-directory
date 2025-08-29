import { ref } from 'vue'
import { useUsersStore } from '@/entities/user'
import { debounce } from '@/shared/lib'

export function useUserSearch() {
  const store = useUsersStore()
  const value = ref<string>(store.search)
  
  const apply = debounce((v: string) => {
    store.search = v
  }, 300)
  
  function set(v: string) {
    value.value = v
    apply(v)
  }
  
  function clear() {
    set('')
  }
  
  return { value, set, clear }
}

