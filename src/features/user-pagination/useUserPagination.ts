import { computed } from 'vue'
import { useUsersStore } from '@/entities/user'
import { USER_PAGE_SIZES } from './constants'

export function useUserPagination() {
  const store = useUsersStore()
  
  const page = computed(() => store.page)
  const pageSize = computed(() => store.pageSize)
  const total = computed(() => store.total) // Используем правильный геттер total
  const pageSizes = USER_PAGE_SIZES
  
  // Вычисляем максимальную страницу
  const maxPage = computed(() => Math.max(1, Math.ceil(total.value / pageSize.value)))
  
  // Определяем, когда кнопки должны быть отключены
  const isFirstPage = computed(() => page.value <= 1)
  const isLastPage = computed(() => page.value >= maxPage.value)
  const hasNoData = computed(() => total.value === 0)
  
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
    maxPage,
    isFirstPage,
    isLastPage,
    hasNoData,
    setPage, 
    setPageSize 
  }
} 