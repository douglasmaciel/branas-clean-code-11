import { Client } from '../domain/entity/Client';
import { Order } from '../domain/entity/Order';
import { OrderRepositoryMemory } from './OrderRepositoryMemory';

test('Deve armazenar um pedido', async () => {
  const order = new Order('id-1', new Client('659.634.004-06'));
  const orderRepository = new OrderRepositoryMemory();
  await orderRepository.add(order);
  expect(orderRepository.get('id-1')).resolves.toBeTruthy();
});

test('Deve retornar "undefined" quando não encontrar o pedido', async () => {
  const orderRepository = new OrderRepositoryMemory();
  expect(orderRepository.get('id-inexistente')).resolves.toBeUndefined();
});
