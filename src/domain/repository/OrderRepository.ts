import { IPersistence } from '../IPersistence';
import { Order } from '../entity/Order';

export class OrderRepository {
  persistenceGateway: IPersistence<Order>;

  constructor(persistenceGateway: IPersistence<Order>) {
    this.persistenceGateway = persistenceGateway;
  }

  add(order: Order) {
    this.persistenceGateway.add(order.id, order);
  }

  get(key: string): Order | undefined {
    return this.persistenceGateway.get(key);
  }
}
