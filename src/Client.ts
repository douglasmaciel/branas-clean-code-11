import { CPF } from './CPF';

export class Client {
  #cpf: CPF;

  constructor(cpf: string) {
    this.#cpf = new CPF(cpf);
  }

  get cpf() {
    return this.#cpf.value;
  }

  isEqualTo(client: Client) {
    return this.#cpf.isEqualTo(new CPF(client.cpf));
  }
}
