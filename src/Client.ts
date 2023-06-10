import { CPF } from './CPF';

export class Client {
  #cpf: CPF;

  constructor(cpf: string) {
    this.#cpf = new CPF(cpf);
  }

  get cpf() {
    return this.#cpf.value;
  }
}
