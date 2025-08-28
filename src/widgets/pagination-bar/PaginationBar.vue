<!-- PaginationBar.vue — виджет пагинации -->
<template>
  <nav class="pb">
    <button type="button" @click="goFirst" :disabled="pageComputed <= 1">« First</button>
    <button type="button" @click="goPrev" :disabled="pageComputed <= 1">‹ Prev</button>
    <span>Page {{ pageComputed }} / {{ maxPage }}</span>
    <button type="button" @click="goNext" :disabled="pageComputed >= maxPage">Next ›</button>
    <button type="button" @click="goLast" :disabled="pageComputed >= maxPage">Last »</button>
    <select :value="pageSize" @change="onPageSize">
      <option :value="10">10</option>
      <option :value="20">20</option>
      <option :value="50">50</option>
    </select>
  </nav>
  
</template>
<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ page: number; pageSize: number; total: number }>();
const emit = defineEmits<{ (e: 'update:page', v: number): void; (e: 'update:pageSize', v: number): void }>();

const maxPage = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)));
const pageComputed = computed(() => Math.min(Math.max(1, props.page), maxPage.value));

function goFirst() { emit('update:page', 1); }
function goPrev() { emit('update:page', Math.max(1, props.page - 1)); }
function goNext() { emit('update:page', Math.min(maxPage.value, props.page + 1)); }
function goLast() { emit('update:page', maxPage.value); }
function onPageSize(e: Event) { emit('update:pageSize', Number((e.target as HTMLSelectElement).value)); }
</script>
<style scoped>
.pb { display: flex; gap: 8px; align-items: center; }
</style>

