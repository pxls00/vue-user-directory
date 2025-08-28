<!-- SearchBar.vue — UI-компонент поиска -->
<template>
  <div class="searchbar">
    <input class="searchbar__input" type="text" :value="query" @input="onInput" placeholder="Search users..." />
    <button class="searchbar__clear" type="button" @click="clear">Clear</button>
  </div>
  
</template>
<script setup lang="ts">
import { useUserSearch } from '../useUserSearch';

const { query, clear } = useUserSearch();

function onInput(e: Event) {
  const target = e.target as HTMLInputElement;
  // v-model-like поведение через компьютид сеттер
  // @ts-expect-error — computed setter
  query.value = target.value;
}
</script>
<style scoped>
.searchbar { display: flex; gap: 8px; }
.searchbar__input { flex: 1; padding: 8px; }
</style>

