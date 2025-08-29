<template>
  <footer class="site-footer">
    <div class="site-footer__content">
      <p class="site-footer__text">&copy; 2024 User Directory. Built with Vue 3 + TypeScript.</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Minimal footer component
</script>

<style scoped>
.site-footer {
  background: #f8f9fa;
  border-top: 1px solid #e9ecef;
  padding: 16px 0;
  margin-top: auto;
}

.site-footer__content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  text-align: center;
}

.site-footer__text {
  margin: 0;
  color: #6c757d;
  font-size: 0.875rem;
}
</style> 