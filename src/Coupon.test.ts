import { Coupon } from './Coupon';

test('Deve criar um cupom de desconto', () => {
  const coupon = new Coupon('id-cupom', 0.1);
  expect(coupon.id).toBe('id-cupom');
  expect(coupon.discount).toBe(0.1);
});
