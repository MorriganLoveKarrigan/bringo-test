<template>
  <AppTable :headers="ORDERS_TABLE_HEADERS" :table-data="orders">
    <template #row="{ item }">
      <tr v-if="isOrder(item)">
        <td>{{ item.id }}</td>
        <td>{{ item.client }}</td>
        <td>{{ item.order_date }}</td>
        <td>
          <ul>
            <li v-for="(good, index) in item.goods" :key="index">{{ good.good }} - {{ good.price }} сум</li>
          </ul>
        </td>
        <td>{{ item.total_amount }}</td>
        <td>
          <button @click="emit('edit-order', item)">
            <img :src="editIcon" alt="edit-icon" />
          </button>
          <button @click="emit('delete-order', item.id)">
            <img :src="deleteIcon" alt="delete-icon" />
          </button>
        </td>
      </tr>
    </template>
  </AppTable>
</template>

<script setup lang="ts">
  import { isOrder, OrdersTableEmits, OrdersTableProps } from './types.ts';
  import { AppTable } from '@/components';
  import deleteIcon from '@/assets/icons/352303_delete_icon.svg';
  import editIcon from '@/assets/icons/edit-2-svgrepo-com.svg';

  const ORDERS_TABLE_HEADERS = ['ID', 'Заказчик', 'Дата заказа', 'Товары', 'Сумма', ''];

  const emit = defineEmits<OrdersTableEmits>();

  defineProps<OrdersTableProps>();
</script>
