import { Dimension } from '../valueObject/Dimension';

export class Product {
  #id: string;
  #description: string;
  #price: number;
  #dimension: Dimension;

  constructor(
    id: string,
    description: string,
    price: number,
    dimension: Dimension
  ) {
    this.#id = id;
    this.#description = description;
    this.#price = price;
    this.#dimension = dimension;
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

  get volume() {
    return this.#dimension.volume;
  }

  get weight() {
    return this.#dimension.weight;
  }
}
