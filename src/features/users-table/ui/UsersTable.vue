<template>
  <table class="ut">
    <thead>
      <tr>
        <th v-bind="headerAttrs('firstName')" @click="onHeaderClick('firstName')">
          First name
        </th>
        <th v-bind="headerAttrs('secondName')" @click="onHeaderClick('secondName')">
          Second name
        </th>
        <th v-bind="headerAttrs('email')" @click="onHeaderClick('email')">
          Email
        </th>
        <th v-bind="headerAttrs('lastVisitedAt')" @click="onHeaderClick('lastVisitedAt')">
          Last visited
        </th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="u in users" :key="String(u.id)">
        <td>{{ u.firstName }}</td>
        <td>{{ u.secondName }}</td>
        <td>{{ u.email }}</td>
        <td>{{ formatDateTime(u.lastVisitedAt) }}</td>
        <td class="ut__actions">
          <AppButton size="sm" variant="ghost" @click="onEdit(u)">Edit</AppButton>
          <AppButton size="sm" variant="danger" @click="onDelete(u)">Delete</AppButton>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { User, UserSortKey, SortDir } from '@/entities/user'
import { formatDateTime } from '@/shared/lib/datetime'
import { useSortToggle } from '../useSortToggle'
import { AppButton } from '@/shared/ui'

interface UsersTableProps {
  users: readonly User[]
  sort: { key: UserSortKey; dir: SortDir }
}

const props = defineProps<UsersTableProps>()

const emit = defineEmits<{
  (e: 'sort-change', payload: { key: UserSortKey; dir: SortDir }): void
  (e: 'edit', payload: User): void
  (e: 'delete', payload: User): void
}>()

const { nextFor, headerAttrs } = useSortToggle(() => props.sort)

function onHeaderClick(key: UserSortKey) {
  emit('sort-change', nextFor(key))
}

function onEdit(user: User) {
  emit('edit', user)
}

function onDelete(user: User) {
  emit('delete', user)
}
</script>

<style scoped>
.ut { 
  width: 100%; 
  border-collapse: collapse; 
}

.ut th, .ut td { 
  padding: 8px; 
  border-bottom: 1px solid #eee; 
  text-align: left; 
}

.ut__actions { 
  display: flex; 
  gap: 8px; 
}

.ut th[data-sortable="true"] { 
  cursor: pointer; 
}

.ut th[data-sorted="true"][data-dir="asc"]::after { 
  content: ' ▲'; 
}

.ut th[data-sorted="true"][data-dir="desc"]::after { 
  content: ' ▼'; 
}
</style> 