<!-- UsersSection.vue — виджет-оркестратор для страницы пользователей -->
<template>
  <section class="users-section">
    <header class="users-section__header">
      <h1 class="users-section__title">Users</h1>
      <div class="users-section__toolbar">
        <SearchBar />
        <button class="users-section__add-btn" type="button" @click="openCreate">
          Add user
        </button>
      </div>
    </header>

    <main class="users-section__content">
      <div class="users-section__table-area">
        <UsersTable
          :users="paged.items"
          :sort="sort"
          :onSortChange="onSortChange"
          :onEdit="onEdit"
          :onDelete="onDelete"
        />
      </div>
    </main>

    <footer class="users-section__footer">
      <div class="users-section__footer-area">
        <PaginationBar
          :page="page"
          :pageSize="pageSize"
          :total="total"
          @update:page="onPage"
          @update:pageSize="onPageSize"
        />
      </div>
    </footer>

    <!-- TODO: Replace with TanStack Query mutations -->
    <UserFormModal :open="isOpen" @close="close">
      <template #title>{{ modalTitle }}</template>
      <UserForm :initial="formInitial" @submit="onSubmit" @cancel="close" />
      <template #footer>
        <button type="button" @click="close">Cancel</button>
      </template>
    </UserFormModal>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUsersStore } from '@/entities/user'
import { SearchBar } from '@/features/user-search'
import { UsersTable } from '@/widgets/users-table'
import { PaginationBar } from '@/widgets/pagination-bar'
import { UserForm } from '@/features/user-crud'
import { UserFormModal } from '@/widgets/user-form-modal'
import { useUserCrud } from '@/features/user-crud'

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
const page = computed(() => store.page)
const pageSize = computed(() => store.pageSize)
const total = computed(() => store.sortedUsers.length)

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

function onEdit(user: any) {
  open('edit', user)
}

function onDelete(user: any) {
  if (confirm('Delete user?')) {
    confirmDelete(user.id)
  }
}

function onSortChange(next: { key: typeof store.sort.key; dir: typeof store.sort.dir }) {
  store.sort = next
}

function onPage(p: number) {
  store.page = p
}

function onPageSize(ps: number) {
  store.pageSize = ps
}

async function onSubmit(payload: any) {
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
.users-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

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

.users-section__add-btn {
  padding: 0.5rem 0.75rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;
}

.users-section__add-btn:hover {
  background-color: #2563eb;
}

.users-section__content {
  min-height: 200px;
}

.users-section__table-area {
  background: transparent;
}

.users-section__footer {
  display: flex;
  justify-content: flex-end;
}

.users-section__footer-area {
  /* Footer content styling */
}
</style> 