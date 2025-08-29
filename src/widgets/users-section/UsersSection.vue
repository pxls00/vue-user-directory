<!-- UsersSection.vue — виджет-оркестратор для страницы пользователей -->
<template>
  <section class="users-section">
    <header class="users-section__header">
      <h1 class="users-section__title">Users</h1>
      <div class="users-section__toolbar">
        <SearchBar />
                  <AppButton variant="primary" @click="openCreate">Add user</AppButton>
      </div>
    </header>

    <div class="users-section__table-area">
      <UsersTable
        :users="paged.items"
        :sort="sort"
        @sort-change="onSortChange"
        @edit="onEdit"
        @delete="onDelete"
      />
    </div>

    <div class="users-section__footer">
      <UserPaginationBar />
    </div>

    <AppModal :open="isOpen" @close="close">
      <template #title>{{ modalTitle }}</template>
      <UserForm :initial="formInitial" @submit="onSubmit" @cancel="close" />
      <template #footer>
        <button type="button" @click="close">Cancel</button>
      </template>
    </AppModal>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { AppModal, AppButton } from '@/shared/ui'
import type { User, UserSortKey, SortDir } from '@/entities/user'
import { UserForm, type UserFormValue, useUserCrud } from '@/features/user-crud'
import { UserPaginationBar } from '@/features/user-pagination'
import { SearchBar } from '@/features/user-search'
import { UsersTable } from '@/features/users-table'
import { useUsersStore } from '@/entities/user'

// TODO: Replace with TanStack Query hooks
// const { data: users, isLoading, error } = useUsersQuery()
// const { mutate: createUser } = useCreateUserMutation()
// const { mutate: updateUser } = useUpdateUserMutation()
// const { mutate: deleteUser } = useDeleteUserMutation()

const store = useUsersStore()
const crud = useUserCrud()

// Computed values from store (will be replaced with queries)
const paged = computed(() => store.pagedUsers)
const sort = computed(() => store.sort)

// CRUD state
const { isOpen, mode, selected, open, close, submitCreate, submitEdit, confirmDelete } = crud

// Computed values for modal
const modalTitle = computed(() => 
  mode.value === 'edit' ? 'Edit user' : 'Create user'
)

const formInitial = computed(() => 
  selected.value ? {
    firstName: selected.value.firstName,
    secondName: selected.value.secondName,
    email: selected.value.email,
    lastVisitedAt: selected.value.lastVisitedAt,
  } : undefined
)

// Event handlers
function openCreate() {
  open('create')
}

function onEdit(user: User) {
  open('edit', user)
}

function onDelete(user: User) {
  if (confirm('Delete user?')) {
    confirmDelete(user.id)
  }
}

function onSortChange(next: { key: UserSortKey; dir: SortDir }) {
  store.sort = next
}

async function onSubmit(payload: UserFormValue) {
  try {
    if (mode.value === 'edit' && selected.value) {
      await submitEdit(selected.value.id, payload)
    } else {
      await submitCreate(payload)
    }
  } catch (error) {
    // TODO: Add proper error handling with toast/notification
    console.error('Form submission failed:', error)
  }
}
</script>

<style scoped>
.users-section__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.users-section__title {
  font-size: 1.25rem;
  margin: 0;
  font-weight: 600;
}

.users-section__toolbar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}



.users-section__table-area {
  background: transparent;
}

.users-section__footer {
  display: flex;
  justify-content: flex-end;
}
</style>
