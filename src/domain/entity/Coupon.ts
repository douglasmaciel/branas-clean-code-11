import dayjs from 'dayjs';
import { Discount } from '../valueObject/Discount';

export class Coupon {
  #id: string;
  #discount: Discount;
  #expiresAt: dayjs.Dayjs;

  constructor(id: string, discount: number, expiresAt: dayjs.Dayjs) {
    this.#id = id;
    this.#discount = new Discount(discount);
    this.#expiresAt = expiresAt;
  }

  get id() {
    return this.#id;
  }

  get discount() {
    return this.#discount.value;
  }

  get expiresAt() {
    return this.#expiresAt;
  }
}
