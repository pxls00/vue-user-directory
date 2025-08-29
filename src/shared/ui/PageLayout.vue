<!-- PageLayout.vue — простой layout для страниц -->
<template>
  <div class="page-layout">
    <header v-if="$slots.header" class="page-layout__header">
      <slot name="header" />
    </header>
    
    <main class="page-layout__content">
      <slot />
    </main>
    
    <footer v-if="$slots.footer" class="page-layout__footer">
      <slot name="footer" />
    </footer>
  </div>
</template>

<script setup lang="ts">
// No props or logic needed - pure layout component
</script>

<style scoped>
.page-layout {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-height: 100%;
}

.page-layout__header {
  /* Header styling */
}

.page-layout__content {
  flex: 1;
  min-height: 0;
}

.page-layout__footer {
  /* Footer styling */
}
</style> 