<!-- UsersPage.vue — страница списка пользователей; собирает виджеты/фичи -->
<template>
  <section class="page">
    <header class="page__header">
      <h1 class="page__title">Users</h1>
      <div class="page__toolbar">
        <SearchBar />
        <button class="add-btn" type="button" @click="openCreate">Add user</button>
      </div>
    </header>
    <main class="page__content">
      <div class="table-area">
        <UsersTable
          :users="paged.items"
          :sort="sort"
          :onSortChange="onSortChange"
          :onEdit="onEdit"
          :onDelete="onDelete"
        />
      </div>
    </main>
    <footer class="page__footer">
      <div class="footer-area">
        <PaginationBar
          :page="page"
          :pageSize="pageSize"
          :total="total"
          @update:page="onPage"
          @update:pageSize="onPageSize"
        />
      </div>
    </footer>
  </section>
  <!-- Логика и данные будут добавлены на следующих шагах -->
  
  <UserFormModal :open="isOpen" @close="close">
    <template #title>{{ modalTitle }}</template>
    <UserForm :initial="formInitial" @submit="onSubmit" />
    <template #footer>
      <button type="button" @click="close">Cancel</button>
    </template>
  </UserFormModal>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useUsersStore } from '@/entities/user';
import { SearchBar } from '@/features/user-search';
import { UsersTable } from '@/widgets/users-table';
import { PaginationBar } from '@/widgets/pagination-bar';
import { UserForm } from '@/features/user-crud';
import { UserFormModal } from '@/widgets/user-form-modal';
import { useUserCrud } from '@/features/user-crud';

const store = useUsersStore();

const paged = computed(() => store.pagedUsers);
const sort = computed(() => store.sort);
const page = computed(() => store.page);
const pageSize = computed(() => store.pageSize);
const total = computed(() => store.sortedUsers.length);

function onSortChange(next: { key: typeof store.sort.key; dir: typeof store.sort.dir }) {
  store.sort = next;
}
function onPage(p: number) { store.page = p; }
function onPageSize(ps: number) { store.pageSize = ps; }
function onEdit(u: any) { crud.openEdit(u); }
function onDelete(u: any) { if (confirm('Delete user?')) crud.confirmDelete(u.id as any); }

const crud = useUserCrud();
const { isOpen, openCreate, openEdit, close, submitCreate, submitEdit } = crud;

const modalTitle = computed(() => (crud.mode.value === 'edit' ? 'Edit user' : 'Create user'));
const formInitial = computed(() => (crud.selected.value ? {
  firstName: crud.selected.value.firstName,
  secondName: crud.selected.value.secondName,
  email: crud.selected.value.email,
  lastVisitedAt: crud.selected.value.lastVisitedAt,
} : undefined));

function onSubmit(payload: { firstName: string; secondName: string; email: string; lastVisitedAt: Date }) {
  if (crud.mode.value === 'edit' && crud.selected.value) {
    submitEdit(crud.selected.value.id as any, payload);
  } else {
    submitCreate(payload);
  }
}
</script>
<style scoped>
.page { display: flex; flex-direction: column; gap: 16px; }
.page__header { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.page__title { font-size: 20px; margin: 0; }
.page__content { min-height: 200px; }
.table-area { background: transparent; }
.page__footer { display: flex; justify-content: flex-end; }
.footer-area { }
.add-btn { padding: 8px 12px; }
</style>

