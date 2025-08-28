<!-- UserForm.vue — форма редактирования/создания пользователя -->
<template>
  <form class="userform" @submit.prevent="onSubmit">
    <div class="userform__row">
      <label>First name</label>
      <input v-model="firstName" type="text" required />
    </div>
    <div class="userform__row">
      <label>Second name</label>
      <input v-model="secondName" type="text" required />
    </div>
    <div class="userform__row">
      <label>Email</label>
      <input v-model="email" type="email" required />
    </div>
    <div class="userform__row">
      <label>Last visited at</label>
      <input v-model="lastVisitedAtInput" type="datetime-local" required />
    </div>
    <div class="userform__actions">
      <button type="submit">Submit</button>
    </div>
    <p v-if="error" class="userform__error">{{ error }}</p>
  </form>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { z } from 'zod';

const emit = defineEmits<{
  (e: 'submit', payload: { firstName: string; secondName: string; email: string; lastVisitedAt: Date }): void;
}>();

const props = defineProps<{ initial?: { firstName?: string; secondName?: string; email?: string; lastVisitedAt?: Date } }>();

const firstName = ref(props.initial?.firstName ?? '');
const secondName = ref(props.initial?.secondName ?? '');
const email = ref(props.initial?.email ?? '');
const lastVisitedAtInput = ref<string>('');
const error = ref<string | null>(null);

watch(
  () => props.initial?.lastVisitedAt,
  (v) => {
    if (v) lastVisitedAtInput.value = toLocalDateTimeInputValue(v);
  },
  { immediate: true }
);

const Schema = z.object({
  firstName: z.string().min(1),
  secondName: z.string().min(1),
  email: z.string().email(),
  lastVisitedAt: z.date(),
});

function toLocalDateTimeInputValue(d: Date): string {
  const pad = (n: number) => n.toString().padStart(2, '0');
  const yyyy = d.getFullYear();
  const MM = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  const hh = pad(d.getHours());
  const mm = pad(d.getMinutes());
  return `${yyyy}-${MM}-${dd}T${hh}:${mm}`;
}

function onSubmit() {
  error.value = null;
  try {
    const parsed = Schema.parse({
      firstName: firstName.value.trim(),
      secondName: secondName.value.trim(),
      email: email.value.trim(),
      lastVisitedAt: new Date(lastVisitedAtInput.value),
    });
    emit('submit', parsed);
  } catch (e) {
    error.value = (e as Error).message ?? 'Validation error';
  }
}
</script>
<style scoped>
.userform { display: grid; gap: 12px; }
.userform__row { display: grid; gap: 4px; }
.userform__actions { display: flex; justify-content: flex-end; gap: 8px; }
.userform__error { color: #c00; }
</style>

