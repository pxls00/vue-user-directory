<template>
  <div class="layout">
    <SiteHeader />
    <main class="layout__main">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<style scoped>
.layout { 
  display: flex; 
  min-height: 100vh; 
  flex-direction: column; 
}

.layout__main { 
  flex: 1; 
  padding: 16px; 
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}
</style> 