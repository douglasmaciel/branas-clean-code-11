import { Product } from './Product';

test('Deve criar um produto', () => {
  const product = new Product(
    'novo-id-do-produto',
    'Descrição do produto de teste',
    5.05
  );

  expect(product.id).toBe('novo-id-do-produto');
  expect(product.description).toBe('Descrição do produto de teste');
  expect(product.price).toBe(5.05);
});
