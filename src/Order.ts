import { Client } from './Client';
import { Product } from './Product';

export class Order {
  #id: string;
  #items: { product: Product; quantity: number }[];
  #client: Client;

  constructor(id: string, client: Client) {
    this.#id = id;
    this.#client = client;
    this.#items = [];
  }

  addProduct(product: Product, quantity: number) {
    this.#items.push({ product, quantity });
    return this;
  }

  get id() {
    return this.#id;
  }

  get client() {
    return this.#client;
  }

  get countProducts() {
    return this.#items.length;
  }

  get total() {
    return this.#items.reduce(
      (sum, item) => (sum += item.product.price * item.quantity),
      0
    );
  }
}
