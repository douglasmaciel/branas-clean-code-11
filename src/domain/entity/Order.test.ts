import dayjs from 'dayjs';
import { Client } from './Client';
import { Coupon } from './Coupon';
import { DuplicateProduct, Order } from './Order';
import { Product } from './Product';

let client: Client;
let order: Order;
const products: Product[] = [];

beforeEach(() => {
  client = new Client('659.634.004-06');
  order = new Order('id-order', client);
  products.push(new Product('id-1', 'Descrição 1', 5));
  products.push(new Product('id-2', 'Descrição 2', 7));
  products.push(new Product('id-3', 'Descrição 3', 3));
});

test('Deve criar um pedido com 3 produtos e calcular o valor total', () => {
  const [product1, product2, product3] = products;
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
  const [product1, product2, product3] = products;
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
  const [product1, product2, product3] = products;
  const cupom = new Coupon('id-cupom', discount, invalidExpiryDate);
  order.addProduct(product1, 2).addProduct(product2, 1).addProduct(product3, 5);
  order.addCoupon(cupom);
  expect(order.id).toBe('id-order');
  expect(order.client.isEqualTo(client)).toBe(true);
  expect(order.countProducts).toBe(3);
  expect(order.total).toBe(total);
});

test('Deve lançar exceção caso seja adicionado a um pedido um produto já existente', () => {
  const product1 = new Product('id-1', 'Descrição 1', 5);
  const otherProduct1 = new Product('id-1', 'Descrição 1', 1);
  expect(() =>
    order.addProduct(product1, 1).addProduct(otherProduct1, 2)
  ).toThrow(DuplicateProduct);
});
