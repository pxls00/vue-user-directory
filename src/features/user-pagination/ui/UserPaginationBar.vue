<template>
  <AppPagination
    :page="page"
    :pageSize="pageSize"
    :total="total"
    :pageSizes="pageSizes"
    :maxPage="maxPage"
    :isFirstPage="isFirstPage"
    :isLastPage="isLastPage"
    :hasNoData="hasNoData"
    @update:page="setPage"
    @update:pageSize="setPageSize"
  />
</template>

<script setup lang="ts">
import { AppPagination } from '@/shared/ui'
import { useUserPagination } from '../useUserPagination'

const { 
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
} = useUserPagination()
</script> 