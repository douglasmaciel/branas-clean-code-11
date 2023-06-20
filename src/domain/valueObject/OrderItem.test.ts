import { Product } from '../entity/Product';
import { InvalidItemQuantity, OrderItem } from './OrderItem';

test('Deve criar um item de um pedido', () => {
  const product = new Product('id-produto-1', 'Produto 1', 6);
  const quantity = 2;
  const orderItem = new OrderItem(product, quantity);
  expect(orderItem.product).toBe(product);
  expect(orderItem.quantity).toBe(quantity);
});

test('Deve lançar exceção caso quantidade de items de um pedido seja negativa', () => {
  const product = new Product('id-produto-1', 'Produto 1', 6);
  const quantity = -1;
  expect(() => new OrderItem(product, quantity)).toThrow(InvalidItemQuantity);
});
