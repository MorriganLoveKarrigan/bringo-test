import { defineStore } from 'pinia';
import { reactive } from 'vue';

import { hasAllNonNullValues } from '@/helpers/hasAllNonNullValues.ts';
import {
  createClientPayload,
  createClientService,
  getClientsService,
  deleteClientService,
  editClientService,
} from '@/services/clients.service.ts';
import { Client } from '@/types/clients.types.ts';

interface ClientsStoreState {
  clients: Client[];
  loading: boolean;
}

export const useClientStore = defineStore('client', () => {
  const clientsState: ClientsStoreState = reactive({
    clients: [],
    loading: false,
  });
  const getClients = (): Client[] => {
    return clientsState.clients;
  };

  const getAllClients = async (): Promise<void> => {
    clientsState.clients = await getClientsService();
  };

  const createClient = async (client: Client): Promise<void> => {
    clientsState.loading = true;
    const expectedKeys: Array<keyof Client> = ['id', 'full_name', 'birth_date', 'address', 'phone'];

    if (!hasAllNonNullValues(client, expectedKeys)) {
      return;
    }
    const clientPayload: createClientPayload = {
      id: client.id!,
      full_name: client.full_name!,
      birth_date: client.birth_date!,
      address: client.address!,
      phone: client.phone!,
    };
    await createClientService(clientPayload);
    await getAllClients();
    clientsState.loading = false;
  };

  const editClient = async (client: Client) => {
    clientsState.loading = true;
    await editClientService(client);
    await getAllClients();
    clientsState.loading = false;
  };

  const deleteClient = async (id: string) => {
    clientsState.loading = true;
    await deleteClientService(id);
    clientsState.loading = false;
  };

  return {
    clientsState,
    getClients,
    getAllClients,
    createClient,
    deleteClient,
    editClient,
  };
});
