<!-- Modal.vue — универсальное модальное окно -->
<template>
  <Teleport to="body">
    <div 
      v-if="open" 
      class="modal"
      role="dialog"
      :aria-modal="true"
      :aria-labelledby="titleId"
    >
      <div class="modal__backdrop" @click="onClose"></div>
      <div class="modal__dialog">
        <header class="modal__header" :id="titleId">
          <slot name="title">Modal Title</slot>
          <button 
            type="button" 
            class="modal__close" 
            @click="onClose"
            aria-label="Close modal"
          >
            ×
          </button>
        </header>
        
        <section class="modal__body">
          <slot />
        </section>
        
        <footer v-if="$slots.footer" class="modal__footer">
          <slot name="footer" />
        </footer>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface ModalProps {
  open: boolean
}

defineProps<ModalProps>()
const emit = defineEmits<{ (e: 'close'): void }>()

// Generate unique ID for accessibility
const titleId = computed(() => `modal-title-${Math.random().toString(36).substr(2, 9)}`)

function onClose() {
  emit('close')
}
</script>

<style scoped>
.modal {
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  z-index: 1000;
}

.modal__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
}

.modal__dialog {
  position: relative;
  background: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  min-width: 400px;
  max-width: 90vw;
  max-height: 90vh;
  overflow: hidden;
  animation: modal-enter 0.2s ease-out;
}

.modal__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
}

.modal__close {
  background: none;
  border: none;
  font-size: 1.5rem;
  font-weight: 300;
  color: #6b7280;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: all 0.15s ease-in-out;
  line-height: 1;
}

.modal__close:hover {
  background: #e5e7eb;
  color: #374151;
}

.modal__body {
  padding: 1.5rem;
  overflow-y: auto;
}

.modal__footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid #e5e7eb;
  background: #f9fafb;
}

@keyframes modal-enter {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .modal__dialog {
    min-width: 90vw;
    margin: 1rem;
  }
  
  .modal__header,
  .modal__body,
  .modal__footer {
    padding: 1rem;
  }
}
</style> 