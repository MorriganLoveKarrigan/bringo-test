import { Order } from '@/types/orders.types.ts';
import { Client } from '@/types/clients.types.ts';

interface AppTableProps {
  tableData: Order[] | Client[];
  headers: string[];
}

export type { AppTableProps };
