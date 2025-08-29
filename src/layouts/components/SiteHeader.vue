<template>
  <header class="site-header">
    <div class="site-header__content">
      <h1 class="site-header__title">User Directory</h1>
      <div class="site-header__actions">
        <slot name="actions" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">

</script>

<style scoped>
.site-header {
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  padding: 12px 0;
}

.site-header__content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.site-header__title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
}

.site-header__actions {
  display: flex;
  gap: 8px;
}
</style> 