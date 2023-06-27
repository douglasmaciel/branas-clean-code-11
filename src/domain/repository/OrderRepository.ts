import { Order } from '../entity/Order';

export interface OrderRepository {
  add(order: Order): Promise<void>;
  get(id: string): Promise<Order | undefined>;
}
