<template>
  <div class="pagination">
    <div class="pagination__size-selector">
      <label for="page-size" class="pagination__size-label">Show:</label>
      <select 
        id="page-size"
        :value="pageSize" 
        @change="onPageSizeChange"
        class="pagination__size-select"
        :disabled="hasNoData"
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

    <div class="pagination__navigation">
      <AppButton 
        type="button"
        @click="goToPage(1)"
        :disabled="isFirstPage || hasNoData"
        aria-label="Go to first page"
        size="sm"
        class="pagination__button"
        :class="{ 'pagination__button--disabled': isFirstPage || hasNoData }"
      >
        First
      </AppButton>
      
      <AppButton 
        type="button"
        @click="goToPage(page - 1)"
        :disabled="isFirstPage || hasNoData"
        aria-label="Go to previous page"
        size="sm"
        class="pagination__button"
        :class="{ 'pagination__button--disabled': isFirstPage || hasNoData }"
      >
        Prev
      </AppButton>
      
      <span class="pagination__info">
        <span v-if="hasNoData">No data to display</span>
        <span v-else>Page {{ page }} of {{ maxPage }}</span>
      </span>
      
      <AppButton 
        type="button"
        @click="goToPage(page + 1)"
        :disabled="isLastPage || hasNoData"
        aria-label="Go to next page"
        size="sm"
        class="pagination__button"
        :class="{ 'pagination__button--disabled': isLastPage || hasNoData }"
      >
        Next
      </AppButton>
      
      <AppButton 
        type="button"
        @click="goToPage(maxPage)"
        :disabled="isLastPage || hasNoData"
        aria-label="Go to last page"
        size="sm"
        class="pagination__button"
        :class="{ 'pagination__button--disabled': isLastPage || hasNoData }"
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
  maxPage?: number      // computed max page
  isFirstPage?: boolean // computed first page state
  isLastPage?: boolean  // computed last page state
  hasNoData?: boolean   // computed no data state
}

const props = withDefaults(defineProps<PaginationProps>(), {
  pageSizes: () => [10, 20, 50] as const,
  maxPage: undefined,
  isFirstPage: undefined,
  isLastPage: undefined,
  hasNoData: undefined
})

const emit = defineEmits<{
  (e: 'update:page', page: number): void
  (e: 'update:pageSize', pageSize: number): void
}>()

// Compute max page if not provided
const computedMaxPage = computed(() => {
  if (props.maxPage !== undefined) return props.maxPage
  return Math.max(1, Math.ceil(props.total / props.pageSize))
})

// Compute states if not provided
const computedIsFirstPage = computed(() => {
  if (props.isFirstPage !== undefined) return props.isFirstPage
  return props.page <= 1
})

const computedIsLastPage = computed(() => {
  if (props.isLastPage !== undefined) return props.isLastPage
  return props.page >= computedMaxPage.value
})

const computedHasNoData = computed(() => {
  if (props.hasNoData !== undefined) return props.hasNoData
  return props.total === 0
})

// Navigation methods with bounds checking
function goToPage(targetPage: number) {
  const clampedPage = Math.max(1, Math.min(targetPage, computedMaxPage.value))
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
	width: 100%;
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

.pagination__size-select:disabled {
  background-color: #f3f4f6;
  color: #9ca3af;
  cursor: not-allowed;
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

.pagination__button {
  transition: all 0.2s ease-in-out;
}

.pagination__button--disabled {
  opacity: 0.6;
  cursor: not-allowed;
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