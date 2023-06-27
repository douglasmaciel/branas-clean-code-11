import { Order } from '../domain/entity/Order';
import { OrderRepository } from '../domain/repository/OrderRepository';

export class OrderRepositoryMemory implements OrderRepository {
  #persistence = new Map<string, Order>();

  async add(order: Order): Promise<void> {
    this.#persistence.set(order.id, order);
  }

  async get(id: string): Promise<Order | undefined> {
    if (!this.#persistence.has(id)) return undefined;
    return this.#persistence.get(id);
  }
}
