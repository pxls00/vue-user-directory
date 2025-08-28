<!-- UserFormModal.vue — модальное окно с формой пользователя -->
<template>
  <div v-if="open" class="modal">
    <div class="modal__backdrop" @click="onClose"></div>
    <div class="modal__dialog">
      <header class="modal__header">
        <slot name="title">User</slot>
        <button type="button" class="modal__close" @click="onClose">×</button>
      </header>
      <section class="modal__body">
        <slot />
      </section>
      <footer class="modal__footer">
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{ open: boolean }>();
const emit = defineEmits<{ (e: 'close'): void }>();

function onClose() { emit('close'); }
</script>
<style scoped>
.modal { position: fixed; inset: 0; display: grid; place-items: center; }
.modal__backdrop { position: absolute; inset: 0; background: rgba(0,0,0,0.3); }
.modal__dialog { position: relative; background: #fff; padding: 16px; border-radius: 8px; min-width: 320px; max-width: 90vw; }
.modal__header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.modal__close { font-size: 18px; }
.modal__footer { display: flex; justify-content: flex-end; gap: 8px; margin-top: 12px; }
</style>

