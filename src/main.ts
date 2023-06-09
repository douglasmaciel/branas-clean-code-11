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

  public get id() {
    return this.#id;
  }

  public get description() {
    return this.#description;
  }

  public get price() {
    return this.#price;
  }

  public get quantity() {
    return this.#quantity;
  }
}
