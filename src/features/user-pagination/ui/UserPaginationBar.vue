<template>
  <AppPagination
    :page="page"
    :pageSize="pageSize"
    :total="total"
    :pageSizes="pageSizes"
    @update:page="setPage"
    @update:pageSize="setPageSize"
  />
</template>

<script setup lang="ts">
import { AppPagination } from '@/shared/ui'
import { useUserPagination } from '../useUserPagination'

const { page, pageSize, total, pageSizes, setPage, setPageSize } = useUserPagination()
</script> 