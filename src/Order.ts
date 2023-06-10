import { Client } from './Client';
import { Coupon } from './Coupon';
import { Product } from './Product';

export class Order {
  #id: string;
  #items: { product: Product; quantity: number }[];
  #client: Client;
  #coupon: Coupon | null;

  constructor(id: string, client: Client) {
    this.#id = id;
    this.#client = client;
    this.#items = [];
    this.#coupon = null;
  }

  addProduct(product: Product, quantity: number) {
    this.#items.push({ product, quantity });
    return this;
  }

  addCoupon(coupon: Coupon) {
    this.#coupon = coupon;
  }

  get id() {
    return this.#id;
  }

  get client() {
    return this.#client;
  }

  get countProducts() {
    return this.#items.length;
  }

  get total() {
    const totalBeforeDiscount = this.#items.reduce(
      (sum, item) => (sum += item.product.price * item.quantity),
      0
    );
    const discount = this.#coupon
      ? totalBeforeDiscount * this.#coupon.discount
      : 0;
    const totalAfterDiscount = totalBeforeDiscount - discount;
    return totalAfterDiscount;
  }
}
