import { computed } from 'vue'
import { useUsersStore } from '@/entities/user'
import { USER_PAGE_SIZES } from './constants'

export function useUserPagination() {
  const store = useUsersStore()
  
  const page = computed(() => store.page)
  const pageSize = computed(() => store.pageSize)
  const total = computed(() => store.sortedUsers.length)
  const pageSizes = USER_PAGE_SIZES
  
  function setPage(n: number): void {
    store.page = n
  }
  
  function setPageSize(n: number): void {
    store.pageSize = n
    store.page = 1
  }
  
  return { 
    page, 
    pageSize, 
    total, 
    pageSizes, 
    setPage, 
    setPageSize 
  }
} 