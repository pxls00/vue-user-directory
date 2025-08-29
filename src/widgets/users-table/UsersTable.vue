<!-- UsersTable.vue — виджет таблицы пользователей -->
<template>
  <table class="ut">
    <thead>
      <tr>
        <th @click="onHeaderClick('firstName')" :class="headerClass('firstName')">First name</th>
        <th @click="onHeaderClick('secondName')" :class="headerClass('secondName')">Second name</th>
        <th @click="onHeaderClick('email')" :class="headerClass('email')">Email</th>
        <th @click="onHeaderClick('lastVisitedAt')" :class="headerClass('lastVisitedAt')">Last visited</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="u in users" :key="String(u.id)">
        <td>{{ u.firstName }}</td>
        <td>{{ u.secondName }}</td>
        <td>{{ u.email }}</td>
        <td>{{ formatDate(u.lastVisitedAt) }}</td>
        <td class="ut__actions">
          <button type="button" @click="onEdit(u)">Edit</button>
          <button type="button" @click="onDelete(u)">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script setup lang="ts">
import type { User, UsersSortKey } from '@/entities/user';

const props = defineProps<{
  users: User[];
  sort: { key: UsersSortKey; dir: 'asc'|'desc' };
  onSortChange: (next: { key: UsersSortKey; dir: 'asc'|'desc' }) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}>();

function onHeaderClick(key: UsersSortKey) {
  const dir = props.sort.key === key && props.sort.dir === 'asc' ? 'desc' : 'asc';
  props.onSortChange({ key, dir });
}

function headerClass(key: UsersSortKey) {
  if (props.sort.key !== key) return 'ut__sortable';
  return `ut__sortable ut__sorted--${props.sort.dir}`;
}

function pad(n: number) { return n.toString().padStart(2, '0'); }
function formatDate(d: Date) {
  const yyyy = d.getFullYear();
  const MM = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  const hh = pad(d.getHours());
  const mm = pad(d.getMinutes());
  return `${yyyy}-${MM}-${dd} ${hh}:${mm}`;
}
</script>
<style scoped>
.ut { width: 100%; border-collapse: collapse; }
.ut th, .ut td { padding: 8px; border-bottom: 1px solid #eee; text-align: left; }
.ut__actions { display: flex; gap: 8px; }
.ut__sortable { cursor: pointer; }
.ut__sorted--asc::after { content: ' \25B2'; }
.ut__sorted--desc::after { content: ' \25BC'; }
</style>

