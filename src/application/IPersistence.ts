export interface IPersistence<T> {
  add(key: string, x: T): void;
  has(key: string): boolean;
  get(key: string): T | undefined;
}
