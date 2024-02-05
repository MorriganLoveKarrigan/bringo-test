import { defineStore } from 'pinia';
import { reactive } from 'vue';

import { Order } from '@/types/orders.types.ts';
import { hasAllNonNullValues } from '@/helpers/hasAllNonNullValues.ts';
import {
  createOrderService,
  CreateOrderPayload,
  getOrdersService,
  deleteOrderService,
  editOrderService,
} from '@/services/orders.service.ts';

interface OrdersStoreState {
  orders: Order[];
  loading: boolean;
}

export const useOrdersStore = defineStore('orders', () => {
  const ordersState: OrdersStoreState = reactive({
    orders: [],
    loading: false,
  });
  const getOrders = (): Order[] => {
    return ordersState.orders;
  };

  const getAllOrders = async (): Promise<void> => {
    ordersState.orders = await getOrdersService();
  };

  const createOrder = async (order: Order): Promise<void> => {
    ordersState.loading = true;
    const expectedKeys: Array<keyof Order> = ['id', 'client', 'order_date', 'goods', 'total_amount'];

    if (!hasAllNonNullValues(order, expectedKeys)) {
      return;
    }
    const orderPayload: CreateOrderPayload = {
      id: order.id!,
      client: order.client!,
      order_date: order.order_date!,
      goods: order.goods!,
      total_amount: order.total_amount!,
    };
    await createOrderService(orderPayload);
    await getAllOrders();
    ordersState.loading = false;
  };

  const editOrder = async (order: Order) => {
    ordersState.loading = true;
    await editOrderService(order);
    await getAllOrders();
    ordersState.loading = false;
  };

  const deleteOrder = async (id: string) => {
    ordersState.loading = true;
    await deleteOrderService(id);
    ordersState.loading = false;
  };

  return {
    ordersState,
    getOrders,
    getAllOrders,
    createOrder,
    deleteOrder,
    editOrder,
  };
});
