import { Product } from '../entity/Product';

export class OrderItem {
  #product: Product;
  #quantity: ItemQuantity;

  constructor(p: Product, q: number) {
    this.#product = p;
    this.#quantity = new ItemQuantity(q);
  }

  get product() {
    return this.#product;
  }

  get quantity() {
    return this.#quantity.value;
  }
}

class ItemQuantity {
  #value: number;

  constructor(v: number) {
    this.#value = v;
    this.validate();
  }

  private validate() {
    if (this.#value < 0) throw new InvalidItemQuantity();
  }

  get value() {
    return this.#value;
  }
}

export class InvalidItemQuantity extends Error {
  constructor() {
    super('');
    this.name = 'InvalidItemQuantity';
  }
}
