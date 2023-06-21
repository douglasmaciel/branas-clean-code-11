import dayjs from 'dayjs';
import { Client } from './Client';
import { Coupon } from './Coupon';
import { DuplicateProduct, Order } from './Order';
import { Product } from './Product';
import { Dimension } from '../valueObject/Dimension';

let client: Client;
let order: Order;
const products: Product[] = [];

beforeEach(() => {
  client = new Client('659.634.004-06');
  order = new Order('id-order', client);
  const [dimension1, dimension2, dimension3] = [
    new Dimension(1, 2, 3, 1),
    new Dimension(4, 5, 6, 7),
    new Dimension(8, 9, 10, 11),
  ];
  products.push(new Product('id-1', 'Descrição 1', 5, dimension1));
  products.push(new Product('id-2', 'Descrição 2', 7, dimension2));
  products.push(new Product('id-3', 'Descrição 3', 3, dimension3));
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
  const dimension = new Dimension(1, 2, 3, 4);
  const product1 = new Product('id-1', 'Descrição 1', 5, dimension);
  const otherProduct1 = new Product('id-1', 'Descrição 1', 1, dimension);
  expect(() =>
    order.addProduct(product1, 1).addProduct(otherProduct1, 2)
  ).toThrow(DuplicateProduct);
});

test.each([
  {
    productList: [
      {
        product: new Product(
          'id-1',
          'Descrição 1',
          5,
          new Dimension(10, 20, 15, 1)
        ),
        quantity: 1,
      },
    ],
    shippingCost: 10,
  },
  {
    productList: [
      {
        product: new Product(
          'id-1',
          'Descrição 1',
          5,
          new Dimension(10, 20, 15, 0.1)
        ),
        quantity: 1,
      },
      {
        product: new Product(
          'id-2',
          'Descrição 1',
          5,
          new Dimension(10, 20, 15, 0.1)
        ),
        quantity: 2,
      },
      {
        product: new Product(
          'id-3',
          'Descrição 1',
          5,
          new Dimension(10, 20, 15, 0.1)
        ),
        quantity: 3,
      },
    ],
    shippingCost: 10,
  },
])(
  'Deve retornar o valor mínimo do frete caso o valor calculado seja menor',
  (input) => {
    for (let p of input.productList) order.addProduct(p.product, p.quantity);
    expect(order.shippingCost).toBe(input.shippingCost);
  }
);

test.each([
  {
    productList: [
      {
        product: new Product(
          'id-1',
          'Descrição 1',
          5,
          new Dimension(10, 20, 15, 5)
        ),
        quantity: 1,
      },
    ],
    shippingCost: (1000 * 5 * 1) / 100,
  },
  {
    productList: [
      {
        product: new Product(
          'id-1',
          'Descrição 1',
          5,
          new Dimension(10, 20, 15, 3)
        ),
        quantity: 1,
      },
      {
        product: new Product(
          'id-2',
          'Descrição 1',
          5,
          new Dimension(10, 20, 15, 4)
        ),
        quantity: 2,
      },
    ],
    shippingCost: (1000 * (3 * 1 + 4 * 2)) / 100,
  },
  {
    productList: [
      {
        product: new Product(
          'id-1',
          'Descrição 1',
          5,
          new Dimension(10, 20, 15, 5)
        ),
        quantity: 3,
      },
    ],
    shippingCost: (1000 * 5 * 3) / 100,
  },
  {
    productList: [
      {
        product: new Product(
          'id-1',
          'Descrição 1',
          5,
          new Dimension(10, 20, 15, 1)
        ),
        quantity: 2,
      },
      {
        product: new Product(
          'id-2',
          'Descrição 1',
          5,
          new Dimension(10, 20, 15, 5)
        ),
        quantity: 3,
      },
    ],
    shippingCost: (1000 * (1 * 2 + 5 * 3)) / 100,
  },
])(
  'Deve retornar o valor do frete de acordo com o peso (em kg) dos produtos',
  (input) => {
    for (let p of input.productList) order.addProduct(p.product, p.quantity);
    expect(order.shippingCost).toBe(input.shippingCost);
  }
);
