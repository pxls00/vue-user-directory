<!-- UserForm.vue — форма редактирования/создания пользователя -->
<template>
  <form class="userform" @submit.prevent="onSubmit">
    <FieldRow 
      id="firstName" 
      label="Имя"
      :error="error"
    >
      <AppInput
        v-model="firstName"
        type="text"
        required
        autocomplete="given-name"
      />
    </FieldRow>

    <FieldRow 
      id="secondName" 
      label="Фамилия"
      :error="error"
    >
      <AppInput
        v-model="secondName"
        type="text"
        required
        autocomplete="family-name"
      />
    </FieldRow>

    <FieldRow 
      id="email" 
      label="Email"
      :error="error"
    >
      <AppInput
        v-model="email"
        type="email"
        required
        autocomplete="email"
      />
    </FieldRow>

    <FieldRow 
      id="lastVisitedAt" 
      label="Дата последнего посещения"
      :error="error"
    >
      <AppInput
        v-model="lastVisitedAtInput"
        type="datetime-local"
        required
      />
    </FieldRow>

    <div class="userform__actions">
      <button type="button" @click="onCancel" class="userform__btn userform__btn--secondary">
        Отмена
      </button>
      <button type="submit" class="userform__btn userform__btn--primary">
        Сохранить
      </button>
    </div>

    <p v-if="error" class="userform__error" role="alert">
      {{ error }}
    </p>
  </form>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { FieldRow, AppInput } from '@/shared/ui'
import { toLocalDateTimeInputValue, fromLocalDateTimeInputValue } from '@/shared/lib'
import { UserFormSchema, type UserFormValue } from '../validation'

interface UserFormProps {
  initial?: Partial<UserFormValue>
}

type Emits = {
  (e: 'submit', payload: UserFormValue): void
  (e: 'cancel'): void
}

const emit = defineEmits<Emits>()
const props = defineProps<UserFormProps>()

// Internal state
const firstName = ref(props.initial?.firstName ?? '')
const secondName = ref(props.initial?.secondName ?? '')
const email = ref(props.initial?.email ?? '')
const lastVisitedAtInput = ref<string>('')
const error = ref<string | null>(null)

// Initialize date input on mount
onMounted(() => {
  if (props.initial?.lastVisitedAt) {
    lastVisitedAtInput.value = toLocalDateTimeInputValue(props.initial.lastVisitedAt)
  }
})

// Build form value from refs
function buildFormValue(): UserFormValue | null {
  const date = fromLocalDateTimeInputValue(lastVisitedAtInput.value)
  if (!date) {
    return null
  }

  return {
    firstName: firstName.value.trim(),
    secondName: secondName.value.trim(),
    email: email.value.trim(),
    lastVisitedAt: date
  }
}

// Validate form value with Zod
function validateFormValue(v: UserFormValue): UserFormValue {
  return UserFormSchema.parse(v)
}

// Handle form submission
function onSubmit() {
  error.value = null
  
  const built = buildFormValue()
  if (!built) {
    error.value = 'Некорректная дата'
    return
  }

  try {
    const parsed = validateFormValue(built)
    emit('submit', parsed)
  } catch (e) {
    if (e instanceof Error) {
      error.value = e.message
    } else {
      error.value = 'Ошибка валидации'
    }
  }
}

// Handle cancel
function onCancel() {
  emit('cancel')
}
</script>

<style scoped>
.userform {
  display: grid;
  gap: 1rem;
}

.userform__actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
}

.userform__btn {
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
}

.userform__btn--primary {
  background-color: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.userform__btn--primary:hover {
  background-color: #2563eb;
  border-color: #2563eb;
}

.userform__btn--secondary {
  background-color: white;
  color: #374151;
}

.userform__btn--secondary:hover {
  background-color: #f9fafb;
  border-color: #9ca3af;
}

.userform__error {
  color: #dc2626;
  font-size: 0.875rem;
  margin: 0;
}
</style>

