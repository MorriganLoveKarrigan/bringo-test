import { Order } from '@/types/orders.types.ts';
import { Client } from '@/types/clients.types.ts';

interface OrdersTableProps {
  orders: Order[];
}

interface OrdersTableEmits {
  (event: 'delete-order', id: string): void;
  (event: 'edit-order', order: Order): void;
}

const isOrder = (item: Client | Order): item is Order => {
  return (item as Order).order_date !== undefined;
};

export type { OrdersTableProps, OrdersTableEmits };
export { isOrder };
