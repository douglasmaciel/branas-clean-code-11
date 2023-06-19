import { IPersistence } from '../../application/IPersistence';

export class MemoryDB<T> implements IPersistence<T> {
  #storage: Map<string, T>;

  constructor() {
    this.#storage = new Map();
  }

  add(key: string, o: T) {
    this.#storage.set(key, o);
  }

  has(key: string): boolean {
    return !!this.#storage.has(key);
  }

  get(key: string): T | undefined {
    return this.#storage.get(key);
  }
}
