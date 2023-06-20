import { Discount, InvalidDiscount } from './Discount';

test.each([-1, 1.2])(
  'Deve lançar uma exceção caso seja fornecido uma porcentagem inválida',
  (discount) => {
    expect(() => new Discount(discount)).toThrow(InvalidDiscount);
  }
);
