<template>
  <AppTable :headers="CLIENTS_TABLE_HEADERS" :table-data="clients">
    <template #row="{ item }">
      <tr v-if="isClient(item)">
        <td>{{ item.id }}</td>
        <td>{{ item.full_name }}</td>
        <td>{{ item.birth_date }}</td>
        <td>{{ item.address }}</td>
        <td>{{ item.phone }}</td>
        <td>
          <button @click="emit('edit-client', item)">
            <img :src="editIcon" alt="edit-icon" />
          </button>
          <button @click="emit('delete-client', item.id)">
            <img :src="deleteIcon" alt="delete-icon" />
          </button>
        </td>
      </tr>
    </template>
  </AppTable>
</template>

<script setup lang="ts">
  import { ClientsTableEmits, ClientsTableProps, isClient } from './types.ts';
  import { AppTable } from '@/components';
  import deleteIcon from '@/assets/icons/352303_delete_icon.svg';
  import editIcon from '@/assets/icons/edit-2-svgrepo-com.svg';

  const CLIENTS_TABLE_HEADERS = ['ID', 'ФИО', 'Дата рождения', 'Адрес', 'Телефон', ''];

  const emit = defineEmits<ClientsTableEmits>();

  defineProps<ClientsTableProps>();
</script>
