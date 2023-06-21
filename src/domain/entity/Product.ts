export class Product {
  #id: string;
  #description: string;
  #price: number;

  constructor(id: string, description: string, price: number) {
    this.#id = id;
    this.#description = description;
    this.#price = price;
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
}
