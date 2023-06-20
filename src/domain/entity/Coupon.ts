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
    if (!this.isDiscountBetween(0, 1)) throw new InvalidDiscount();
  }

  private isDiscountBetween(start: number, end: number) {
    return this.#discount >= start && this.#discount <= end;
  }

  get id() {
    return this.#id;
  }

  get discount() {
    return this.#discount;
  }

  get expiresAt() {
    return this.#expiresAt;
  }
}

export class InvalidDiscount extends Error {
  constructor() {
    super('');
    this.name = 'InvalidDiscount';
  }
}
