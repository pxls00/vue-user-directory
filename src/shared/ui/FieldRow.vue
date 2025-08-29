<template>
  <div class="field-row">
    <!-- Label -->
    <label 
      v-if="label || $slots.label" 
      :for="id" 
      class="field-row__label"
    >
      <slot name="label">{{ label }}</slot>
    </label>

    <!-- Input slot -->
    <div class="field-row__input">
      <slot />
    </div>

    <!-- Hint -->
    <div 
      v-if="hint" 
      class="field-row__hint"
      :id="`${id}-hint`"
    >
      {{ hint }}
    </div>

    <!-- Error -->
    <div 
      v-if="error || $slots.error" 
      class="field-row__error"
      :id="`${id}-error`"
      role="alert"
      aria-live="polite"
    >
      <slot name="error">{{ error }}</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface FieldRowProps {
  id: string
  label?: string
  error?: string | null
  hint?: string
}

defineProps<FieldRowProps>()
</script>

<style scoped>
.field-row {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.field-row__label {
  font-weight: 500;
  color: #374151;
  font-size: 0.875rem;
}

.field-row__input {
  width: 100%;
  display: flex;
}

.field-row__hint {
  font-size: 0.75rem;
  color: #6b7280;
}

.field-row__error {
  font-size: 0.75rem;
  color: #dc2626;
}
</style> 