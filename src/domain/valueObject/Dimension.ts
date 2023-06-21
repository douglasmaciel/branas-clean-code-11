export class Dimension {
  static MIN_WEIGHT = 0; // kg
  static MAX_WEIGHT = 100; // kg
  static MIN_LENGTH = 0; // centimeters
  static MAX_LENGTH = 300; // centimeters
  #height: number;
  #width: number;
  #depth: number;
  #weight: number;

  constructor(height: number, width: number, depth: number, weight: number) {
    this.#height = height;
    this.#width = width;
    this.#depth = depth;
    this.#weight = weight;
    this.validate();
  }

  private validate() {
    if (
      !this.isValidLength(this.#height) ||
      !this.isValidLength(this.#width) ||
      !this.isValidLength(this.#depth)
    )
      throw new InvalidLength();
    if (!this.isValidWeight()) throw new InvalidWeight();
  }

  private isValidLength(length: number) {
    return length > Dimension.MIN_LENGTH && length <= Dimension.MAX_LENGTH;
  }

  private isValidWeight() {
    return (
      this.#weight > Dimension.MIN_WEIGHT &&
      this.#weight <= Dimension.MAX_WEIGHT
    );
  }

  get height() {
    return this.#height;
  }

  get width() {
    return this.#width;
  }

  get depth() {
    return this.#depth;
  }

  // cubic meters
  get volume() {
    return (this.#height * this.#width * this.#depth) / Math.pow(100, 3);
  }

  get weight() {
    return this.#weight;
  }
}

export class InvalidLength extends Error {
  constructor() {
    super('');
    this.name = 'InvalidLength';
  }
}

export class InvalidWeight extends Error {
  constructor() {
    super('');
    this.name = 'InvalidWeight';
  }
}
