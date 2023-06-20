export class Discount {
  #value: number;

  constructor(v: number) {
    this.#value = v;
    this.validate();
  }

  private validate() {
    if (!this.isValueBetween(0, 1)) throw new InvalidDiscount();
  }

  private isValueBetween(start: number, end: number) {
    return this.#value >= start && this.#value <= end;
  }

  get value() {
    return this.#value;
  }
}

export class InvalidDiscount extends Error {
  constructor() {
    super('');
    this.name = 'InvalidDiscount';
  }
}
