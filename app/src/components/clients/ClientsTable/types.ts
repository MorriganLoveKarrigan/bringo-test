import { Client } from '@/types/clients.types.ts';
import { Order } from '@/types/orders.types.ts';

interface ClientsTableProps {
  clients: Client[];
}

interface ClientsTableEmits {
  (event: 'delete-client', id: string): void;
  (event: 'edit-client', client: Client): void;
}

const isClient = (item: Client | Order): item is Client => {
  return (item as Client).full_name !== undefined;
};

export type { ClientsTableProps, ClientsTableEmits };
export { isClient };
