<template>
  <div class="clients-main-page">
    <div class="clients-main-page-create-block">
      <button class="app-button" @click="handleModal(true)">Создать клиента</button>
    </div>
    <ClientsTable :clients="clients" @delete-client="handleDeleteClient" @edit-client="handleEditClient" />
    <ClientsModal v-if="modalIsOpen" @close="handleModal" :client="currentClient" @submit="handleSubmit" />
  </div>
</template>

<script setup lang="ts">
  import { computed, onBeforeMount, ref } from 'vue';

  import './ClientsIndex.scss';

  import { ClientsTable, ClientsModal } from '@/components';
  import { useClientStore } from '@/store/clients.store.ts';
  import { Client } from '@/types/clients.types.ts';

  const currentClient = ref<Client | null>(null);
  const modalIsOpen = ref<boolean>(false);

  const clientsStore = useClientStore();

  const clients = computed(() => {
    return clientsStore.getClients();
  });

  const handleModal = (boolean: boolean): void => {
    modalIsOpen.value = boolean;
  };
  const handleSubmit = async (client: Client): Promise<void> => {
    if (currentClient.value) {
      await clientsStore.editClient(client);
      currentClient.value = null;
    } else {
      await clientsStore.createClient(client);
    }
    handleModal(false);
  };

  const handleEditClient = (client: Client): void => {
    currentClient.value = JSON.parse(JSON.stringify(client));
    handleModal(true);
  };

  const handleDeleteClient = async (id: string): Promise<void> => {
    await clientsStore.deleteClient(id);
    await clientsStore.getAllClients();
  };

  onBeforeMount((): void => {
    clientsStore.getAllClients();
  });
</script>
