import dayjs from 'dayjs';

export class Coupon {
  #id: string;
  #discount: number;
  #expiresAt: dayjs.Dayjs;

  constructor(id: string, discount: number, expiresAt: dayjs.Dayjs) {
    this.#id = id;
    this.#discount = discount;
    this.#expiresAt = expiresAt;
    this.validate();
  }

  private validate() {
    if (this.#discount < 0 || this.#discount > 1) throw new InvalidDiscount();
  }

  get id() {
    return this.#id;
  }

  get discount() {
    return this.#discount;
  }
}

export class InvalidDiscount extends Error {
  constructor() {
    super('');
    this.name = 'InvalidDiscount';
  }
}
