interface Order {
  id: string;
  client: string | null;
  order_date: string | null;
  goods: OrderGoods[] | null;
  total_amount: number | null;
}
interface OrderGoods {
  good: string | null;
  price: number | null;
}

export type { Order, OrderGoods };
