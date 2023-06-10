export class CPF {
  #value: string;

  constructor(cpf: string) {
    this.#value = cpf;
    this.validate();
  }

  private validate() {
    if (this.#value.search(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/) === -1)
      throw new InvalidCPF();
    if (
      this.numericValue
        .split('')
        .every((el) => el === this.numericValue.charAt(0))
    )
      throw new InvalidCPF();
    if (
      parseInt(this.#value.charAt(12)) !==
      this.calculateFirstVerificationDigit()
    )
      throw new InvalidCPF();
    if (
      parseInt(this.#value.charAt(13)) !==
      this.calculateSecondVerificationDigit()
    )
      throw new InvalidCPF();
  }

  private calculateFirstVerificationDigit(): number {
    const numericCPF = this.numericValue;
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += (10 - i) * parseInt(numericCPF.charAt(i));
    }
    const remainder = sum % 11;
    if (remainder < 2) return 0;
    else return 11 - remainder;
  }

  private calculateSecondVerificationDigit(): number {
    const numericCPF = this.numericValue;
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += (11 - i) * parseInt(numericCPF.charAt(i));
    }
    sum += 2 * this.calculateFirstVerificationDigit();
    const remainder = sum % 11;
    if (remainder < 2) return 0;
    else return 11 - remainder;
  }

  get value() {
    return this.#value;
  }

  get numericValue() {
    return this.#value.replace(/\D/g, '');
  }

  isEqualTo(cpf: CPF) {
    return this.#value === cpf.value;
  }
}

export class InvalidCPF extends Error {
  constructor() {
    super('');
    this.name = 'InvalidCPF';
  }
}
