<!-- SearchBar.vue — UI-компонент поиска -->
<template>
  <div class="searchbar">
    <AppInput 
      v-model="value" 
      type="search" 
      placeholder="Search users..." 
      @update:modelValue="(v) => set(String(v))" 
    />
    <button type="button" @click="clear" class="searchbar__clear">
      Clear
    </button>
  </div>
</template>

<script setup lang="ts">
import { useUserSearch } from '../useUserSearch'
import { AppInput } from '@/shared/ui'

const { value, set, clear } = useUserSearch()
</script>

<style scoped>
.searchbar {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.searchbar__clear {
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: white;
  color: #374151;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
}

.searchbar__clear:hover {
  background-color: #f9fafb;
  border-color: #9ca3af;
}
</style>

