import { CPF } from './CPF';

export class Client {
  #id: string;
  #cpf: CPF;

  constructor(id: string, cpf: string) {
    this.#id = id;
    this.#cpf = new CPF(cpf);
  }

  get id() {
    return this.#id;
  }

  get cpf() {
    return this.#cpf.value;
  }
}
