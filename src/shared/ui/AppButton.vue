<template>
  <button
    class="app-btn"
    :class="[
      variant && `app-btn--${variant}`,
      size && `app-btn--${size}`,
    ]"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
type Variant = 'primary' | 'ghost' | 'danger'
type Size = 'sm' | 'md'

defineProps<{ variant?: Variant; size?: Size }>()
</script>

<style scoped>
.app-btn { 
  border: 1px solid transparent; 
  background: #f5f5f5; 
  color: #111; 
  padding: .5rem .75rem; 
  border-radius: .375rem; 
  cursor: pointer; 
}

.app-btn:hover { 
  background: #eee; 
}

.app-btn--primary { 
  background: #3b82f6; 
  color: #fff; 
}

.app-btn--primary:hover { 
  background: #2563eb; 
}

.app-btn--ghost { 
  background: transparent; 
  border-color: #ddd; 
}

.app-btn--danger { 
  background: #ef4444; 
  color: #fff; 
}

.app-btn--danger:hover { 
  background: #dc2626; 
}

.app-btn--sm { 
  padding: .25rem .5rem; 
  font-size: .875rem; 
}

.app-btn--md { 
  padding: .5rem .75rem; 
  font-size: .9rem; 
}
</style> 