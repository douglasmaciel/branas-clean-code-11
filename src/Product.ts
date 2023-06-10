export class Product {
  #id: string;
  #description: string;
  #price: number;
  #quantity: number;

  constructor(id: string, d: string, p: number, q: number) {
    this.#id = id;
    this.#description = d;
    this.#price = p;
    this.#quantity = q;
  }

  get id() {
    return this.#id;
  }

  get description() {
    return this.#description;
  }

  get price() {
    return this.#price;
  }

  get quantity() {
    return this.#quantity;
  }
}
