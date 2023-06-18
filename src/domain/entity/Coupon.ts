export class Coupon {
  #id: string;
  #discount: number;

  constructor(id: string, discount: number) {
    this.#id = id;
    this.#discount = discount;
  }

  get id() {
    return this.#id;
  }

  get discount() {
    return this.#discount;
  }
}
