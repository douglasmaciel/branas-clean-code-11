import dayjs from 'dayjs';
import { Coupon, InvalidDiscount, InvalidExpiryDate } from './Coupon';

test('Deve criar um cupom de desconto', () => {
  const expiresAt = dayjs().add(1, 'M');
  const coupon = new Coupon('id-cupom', 0.1, expiresAt);
  expect(coupon.id).toBe('id-cupom');
  expect(coupon.discount).toBe(0.1);
});

test.each([-1, 1.2])(
  'Deve lançar uma exceção caso seja fornecido uma porcentagem inválida',
  (discount) => {
    const expiresAt = dayjs().add(1, 'M');
    expect(() => new Coupon('id-cupom', discount, expiresAt)).toThrow(
      InvalidDiscount
    );
  }
);

test.each([dayjs(), dayjs().subtract(1, 's')])(
  'Deve lançar uma exceção caso seja fornecido uma data de expiração inválida',
  (expiresAt) => {
    expect(() => new Coupon('id-cupom', 0.1, expiresAt)).toThrow(
      InvalidExpiryDate
    );
  }
);
