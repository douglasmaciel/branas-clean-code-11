import { Product } from './main';

test('Deve criar um produto', () => {
  const product = new Product('Descrição do produto de teste', 5.05, 10);

  expect(product.id).not.toBe('');
  expect(product.description).toBe('Descrição do produto de teste');
  expect(product.price).toBe(5.05);
  expect(product.quantity).toBe(10);
});
