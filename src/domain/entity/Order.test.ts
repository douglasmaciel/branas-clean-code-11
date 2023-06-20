import dayjs from 'dayjs';
import { Client } from './Client';
import { Coupon } from './Coupon';
import { Order } from './Order';
import { Product } from './Product';

test('Deve criar um pedido com 3 produtos e calcular o valor total', () => {
  const product1 = new Product('id-1', 'Descrição 1', 5, 10);
  const product2 = new Product('id-2', 'Descrição 2', 7, 20);
  const product3 = new Product('id-3', 'Descrição 3', 3, 30);
  const client = new Client('659.634.004-06');
  const order = new Order('id-order', client);
  order.addProduct(product1, 2).addProduct(product2, 1).addProduct(product3, 5);
  expect(order.id).toBe('id-order');
  expect(order.client.isEqualTo(client)).toBe(true);
  expect(order.countProducts).toBe(3);
  expect(order.total).toBe(2 * 5 + 1 * 7 + 5 * 3);
});

test('Deve criar um pedido com 3 produtos, associar um cupom de desconto e calcular o valor total', () => {
  const totalBeforeDiscount = 2 * 5 + 1 * 7 + 5 * 3;
  const discount = 0.1;
  const expiryDate = dayjs().add(1, 'M');
  const totalAfterDiscount =
    totalBeforeDiscount - totalBeforeDiscount * discount;
  const product1 = new Product('id-1', 'Descrição 1', 5);
  const product2 = new Product('id-2', 'Descrição 2', 7);
  const product3 = new Product('id-3', 'Descrição 3', 3);
  const client = new Client('659.634.004-06');
  const order = new Order('id-order', client);
  const cupom = new Coupon('id-cupom', discount, expiryDate);
  order.addProduct(product1, 2).addProduct(product2, 1).addProduct(product3, 5);
  order.addCoupon(cupom);
  expect(order.id).toBe('id-order');
  expect(order.client.isEqualTo(client)).toBe(true);
  expect(order.countProducts).toBe(3);
  expect(order.total).toBe(totalAfterDiscount);
});

test('Deve criar um pedido com 3 produtos, associar um cupom de desconto expirado e não alterar valor total', () => {
  const total = 2 * 5 + 1 * 7 + 5 * 3;
  const discount = 0.1;
  const invalidExpiryDate = dayjs().subtract(1, 's');
  const product1 = new Product('id-1', 'Descrição 1', 5);
  const product2 = new Product('id-2', 'Descrição 2', 7);
  const product3 = new Product('id-3', 'Descrição 3', 3);
  const client = new Client('659.634.004-06');
  const order = new Order('id-order', client);
  const cupom = new Coupon('id-cupom', discount, invalidExpiryDate);
  order.addProduct(product1, 2).addProduct(product2, 1).addProduct(product3, 5);
  order.addCoupon(cupom);
  expect(order.id).toBe('id-order');
  expect(order.client.isEqualTo(client)).toBe(true);
  expect(order.countProducts).toBe(3);
  expect(order.total).toBe(total);
});
