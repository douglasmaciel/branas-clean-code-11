export class Product {
  #id: string;
  #description: string;
  #price: number;

  constructor(id: string, d: string, p: number) {
    this.#id = id;
    this.#description = d;
    this.#price = p;
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
