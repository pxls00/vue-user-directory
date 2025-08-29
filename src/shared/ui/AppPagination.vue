<!-- Pagination.vue — универсальный компонент пагинации -->
<template>
  <div class="pagination">
    <!-- Page size selector -->
    <div class="pagination__size-selector">
      <label for="page-size" class="pagination__size-label">Show:</label>
      <select 
        id="page-size"
        :value="pageSize" 
        @change="onPageSizeChange"
        class="pagination__size-select"
      >
        <option 
          v-for="size in pageSizes" 
          :key="size" 
          :value="size"
        >
          {{ size }}
        </option>
      </select>
    </div>

    <!-- Page navigation -->
    <div class="pagination__navigation">
      <AppButton 
        type="button"
        @click="goToPage(1)"
        :disabled="page <= 1"
        aria-label="Go to first page"
        size="sm"
      >
        First
      </AppButton>
      
      <AppButton 
        type="button"
        @click="goToPage(page - 1)"
        :disabled="page <= 1"
        aria-label="Go to previous page"
        size="sm"
      >
        Prev
      </AppButton>
      
      <span class="pagination__info">
        Page {{ page }} of {{ maxPage }}
      </span>
      
      <AppButton 
        type="button"
        @click="goToPage(page + 1)"
        :disabled="page >= maxPage"
        aria-label="Go to next page"
        size="sm"
      >
        Next
      </AppButton>
      
      <AppButton 
        type="button"
        @click="goToPage(maxPage)"
        :disabled="page >= maxPage"
        aria-label="Go to last page"
        size="sm"
      >
        Last
      </AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { AppButton } from '@/shared/ui'

interface PaginationProps {
  page: number          // 1-based
  pageSize: number
  total: number
  pageSizes?: readonly number[] // defaults [10,20,50]
}

const props = withDefaults(defineProps<PaginationProps>(), {
  pageSizes: () => [10, 20, 50] as const
})

const emit = defineEmits<{
  (e: 'update:page', page: number): void
  (e: 'update:pageSize', pageSize: number): void
}>()

// Compute max page
const maxPage = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)))

// Navigation methods with bounds checking
function goToPage(targetPage: number) {
  const clampedPage = Math.max(1, Math.min(targetPage, maxPage.value))
  emit('update:page', clampedPage)
}

function onPageSizeChange(event: Event) {
  const target = event.target as HTMLSelectElement
  const newPageSize = parseInt(target.value, 10)
  emit('update:pageSize', newPageSize)
}
</script>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 0;
}

.pagination__size-selector {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.pagination__size-label {
  font-size: 0.875rem;
  color: #374151;
  font-weight: 500;
}

.pagination__size-select {
  padding: 0.375rem 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  background-color: white;
  color: #374151;
}

.pagination__navigation {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.pagination__info {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
  padding: 0 0.5rem;
  min-width: 6rem;
  text-align: center;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .pagination {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .pagination__navigation {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style> 