import { AxiosResponse } from 'axios';

import apiClient from '@/services/apiClient.ts';
import { Order, OrderGoods } from '@/types/orders.types.ts';

const END_POINT = 'api/orders';

export interface CreateOrderPayload {
  id: string;
  client: string;
  order_date: string;
  goods: OrderGoods[];
  total_amount: number;
}
export const createOrderService = async (payload: CreateOrderPayload) => {
  return await apiClient.post(END_POINT, payload).then((response): AxiosResponse<Order> => response.data);
};

export const getOrdersService = async () => {
  return await apiClient.get(END_POINT).then((response): Promise<Order[]> => response.data);
};

export const deleteOrderService = async (id: string) => {
  return await apiClient.delete(`${END_POINT}/${id}`);
};

export const editOrderService = async (order: Order) => {
  return await apiClient.put(`${END_POINT}/${order.id}`, order);
};
