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
      <AppButton type="button" @click="onCancel" variant="ghost">
        Отмена
      </AppButton>
      <AppButton type="submit" variant="primary">
        Сохранить
      </AppButton>
    </div>

    <p v-if="error" class="userform__error" role="alert">
      {{ error }}
    </p>
  </form>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { FieldRow, AppInput, AppButton } from '@/shared/ui'
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

.userform__error {
  color: #dc2626;
  font-size: 0.875rem;
  margin: 0;
}
</style>

