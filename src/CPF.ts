export class CPF {
  #value: string;

  constructor(cpf: string) {
    this.validate(cpf);
    this.#value = cpf;
  }

  private validate(cpf: string) {
    if (!cpf.match(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)) {
      throw new InvalidCPF();
    }
  }

  get value() {
    return this.#value;
  }
}

export class InvalidCPF extends Error {
  constructor() {
    super('');
    this.name = 'InvalidCPF';
  }
}
