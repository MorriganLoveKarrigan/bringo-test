import { AxiosResponse } from 'axios';

import apiClient from '@/services/apiClient.ts';
import { Client } from '@/types/clients.types.ts';

const END_POINT = 'api/clients';

export interface createClientPayload {}
export const createClientService = async (payload: createClientPayload) => {
  return await apiClient.post(END_POINT, payload).then((response): AxiosResponse<Client> => response.data);
};

export const getClientsService = async () => {
  return await apiClient.get(END_POINT).then((response): Promise<Client[]> => response.data);
};

export const deleteClientService = async (id: string) => {
  return await apiClient.delete(`${END_POINT}/${id}`);
};

export const editClientService = async (client: Client) => {
  return await apiClient.put(`${END_POINT}/${client.id}`, client);
};
