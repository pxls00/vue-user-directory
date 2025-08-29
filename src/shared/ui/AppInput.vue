<template>
  <input
    :value="modelValue"
    :type="type"
    :id="id"
    :name="name"
    :placeholder="placeholder"
    :required="required"
    :autocomplete="autocomplete"
    :inputmode="inputmode"
    class="app-input"
    v-bind="$attrs"
    @input="handleInput"
  />
</template>

<script setup lang="ts">
interface AppInputProps {
  modelValue: string | number
  type?: 'text' | 'email' | 'number' | 'datetime-local' | 'password' | 'search'
  id?: string
  name?: string
  placeholder?: string
  required?: boolean
  autocomplete?: string
  inputmode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search'
}

interface AppInputEmits {
  (e: 'update:modelValue', value: string | number): void
}

const props = withDefaults(defineProps<AppInputProps>(), {
  type: 'text'
})

const emit = defineEmits<AppInputEmits>()

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = props.type === 'number' ? Number(target.value) : target.value
  emit('update:modelValue', value)
}
</script>

<style scoped>
.app-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #111827;
  background-color: #ffffff;
  transition: border-color 0.15s ease-in-out;
}

.app-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.app-input::placeholder {
  color: #9ca3af;
}
</style> 