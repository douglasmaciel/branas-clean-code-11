import { Dimension } from '../valueObject/Dimension';
import { Product } from './Product';

test('Deve criar um produto', () => {
  const dimension = new Dimension(20, 15, 10, 1);
  const product = new Product(
    'novo-id-do-produto',
    'Descrição do produto de teste',
    5.05,
    dimension
  );

  expect(product.id).toBe('novo-id-do-produto');
  expect(product.description).toBe('Descrição do produto de teste');
  expect(product.price).toBe(5.05);
  expect(product.volume).toBe(dimension.volume);
  expect(product.weight).toBe(dimension.weight);
});
