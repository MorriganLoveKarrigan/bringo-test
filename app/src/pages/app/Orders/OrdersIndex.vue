<template>
  <div class="orders-main-page">
    <div class="orders-main-page-create-block">
      <button class="app-button" @click="handleModal(true)">Создать заказ</button>
    </div>
    <OrdersTable :orders="orders" @delete-order="handleDeleteOrder" @edit-order="handleEditOrder" />
    <OrdersModal
      v-if="modalIsOpen"
      @close="handleModal"
      :order="currentOrder"
      :clients="clients"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
  import { computed, onBeforeMount, ref } from 'vue';

  import './OrdersIndex.scss';

  import { Order } from '@/types/orders.types.ts';
  import { OrdersTable, OrdersModal } from '@/components';
  import { useOrdersStore } from '@/store/orders.store.ts';
  import { useClientStore } from '@/store/clients.store.ts';

  const currentOrder = ref<Order | null>(null);
  const modalIsOpen = ref(false);

  const ordersStore = useOrdersStore();
  const clientsStore = useClientStore();

  const orders = computed(() => {
    return ordersStore.getOrders();
  });
  const clients = computed(() => {
    return clientsStore.clientsState.clients;
  });

  const handleModal = (boolean: boolean) => {
    modalIsOpen.value = boolean;
  };
  const handleSubmit = async (order: Order): Promise<void> => {
    if (currentOrder.value) {
      await ordersStore.editOrder(order);
      currentOrder.value = null;
    } else {
      await ordersStore.createOrder(order);
    }
    handleModal(false);
  };

  const handleEditOrder = (order: Order) => {
    currentOrder.value = JSON.parse(JSON.stringify(order));
    handleModal(true);
  };

  const handleDeleteOrder = async (id: string): Promise<void> => {
    await ordersStore.deleteOrder(id);
    await ordersStore.getAllOrders();
  };

  onBeforeMount((): void => {
    ordersStore.getAllOrders();
    clientsStore.getAllClients();
  });
</script>
