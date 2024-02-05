import { Client } from '@/types/clients.types.ts';

interface ClientsModalEmits {
  (event: 'close', boolean: boolean): void;
  (event: 'submit', client: Client): void;
}

interface ClientsModalProps {
  client: Client | null;
}

interface ClientsModalFields {
  id: string;
  full_name: string;
  birth_date: string;
  address: string;
  phone: string;
}

export type { ClientsModalProps, ClientsModalEmits, ClientsModalFields };
