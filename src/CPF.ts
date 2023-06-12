export class CPF {
  #value: string;

  constructor(cpf: string) {
    this.#value = cpf;
    this.validate();
  }

  private validate() {
    if (!this.isValidFormat()) throw new InvalidCPF();
    if (this.isAllDigitsEqual()) throw new InvalidCPF();
    if (!this.isFirstVerificationDigitValid()) throw new InvalidCPF();
    if (!this.isSecondVerificationDigitValid()) throw new InvalidCPF();
  }

  private isValidFormat() {
    return this.#value.search(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/) !== -1;
  }

  private isAllDigitsEqual() {
    return this.numericValue
      .split('')
      .every((el) => el === this.numericValue.charAt(0));
  }

  private isFirstVerificationDigitValid() {
    return (
      parseInt(this.numericValue.charAt(9)) ===
      this.calculateFirstVerificationDigit()
    );
  }

  private isSecondVerificationDigitValid() {
    return (
      parseInt(this.numericValue.charAt(10)) ===
      this.calculateSecondVerificationDigit()
    );
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
    for (let i = 0; i < 10; i++) {
      sum += (11 - i) * parseInt(numericCPF.charAt(i));
    }
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
