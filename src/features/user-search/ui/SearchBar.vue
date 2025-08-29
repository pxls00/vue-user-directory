<!-- SearchBar.vue — UI-компонент поиска -->
<template>
  <div class="searchbar">
    <AppInput 
      v-model="value" 
      type="search" 
      placeholder="Search users..." 
      @update:modelValue="(v) => set(String(v))" 
    />
    <AppButton type="button" @click="clear" variant="ghost">
      Clear
    </AppButton>
  </div>
</template>

<script setup lang="ts">
import { useUserSearch } from '../useUserSearch'
import { AppInput, AppButton } from '@/shared/ui'

const { value, set, clear } = useUserSearch()
</script>

<style scoped>
.searchbar {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
</style>

