<!-- UsersPage.vue — страница списка пользователей -->
<template>
  <div class="page">
    <!-- TODO: Add page-level layout, breadcrumbs, or navigation here if needed -->
    <UsersSection />
  </div>
</template>

<script setup lang="ts">
import { UsersSection } from '@/widgets/users-section'

// TODO: Add page-level logic here if needed (e.g., route guards, page metadata)
// TODO: Inject TanStack Query providers or other app-level concerns
</script>

<style scoped>
.page {
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}
</style>

