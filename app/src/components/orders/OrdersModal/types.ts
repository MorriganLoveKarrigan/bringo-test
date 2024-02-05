import { Order, OrderGoods } from '@/types/orders.types.ts';
import { Client } from '@/types/clients.types.ts';

interface OrdersModalEmits {
  (event: 'close', boolean: boolean): void;
  (event: 'submit', order: Order): void;
}

interface OrdersModalProps {
  order: Order | null;
  clients: Client[] | null;
}

interface ModalOrderFields {
  client: string | null;
  order_date: string | null;
  goods: OrderGoods[];
}

export type { OrdersModalProps, OrdersModalEmits, ModalOrderFields };
