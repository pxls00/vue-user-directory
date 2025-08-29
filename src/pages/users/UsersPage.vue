<!-- UsersPage.vue — thin route wrapper with async loading -->
<template>
  <Suspense>
    <template #default>
      <UsersSection />
    </template>
    <template #fallback>
      <div class="users-page__loading">
        <h2>Loading users...</h2>
        <p>Please wait while we fetch the user data</p>
      </div>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

// Асинхронная загрузка компонента с данными
const UsersSection = defineAsyncComponent(() => 
  import('@/widgets/users-section').then(m => m.UsersSection)
)
</script>

<style scoped>
.users-page__loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  text-align: center;
}

.users-page__loading h2 {
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  color: #333;
}

.users-page__loading p {
  margin: 0;
  color: #666;
  font-size: 1rem;
}
</style>

