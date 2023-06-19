import { IPersistence } from '../IPersistence';
import { Order } from '../../domain/entity/Order';

export class OrderRepository {
  #storage: IPersistence<Order>;

  constructor(p: IPersistence<Order>) {
    this.#storage = p;
  }

  add(o: Order) {
    this.#storage.add(o.id, o);
  }

  get(key: string): Order | undefined {
    return this.#storage.get(key);
  }
}
