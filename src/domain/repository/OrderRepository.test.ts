import _ from 'lodash';
import { Client } from '../entity/Client';
import { Order } from '../entity/Order';
import { MemoryDB } from '../../infra/persistence/MemoryDBGateway';
import { OrderRepository } from './OrderRepository';

test('Deve armazenar um pedido', () => {
  const validOrder = new Order('id-order', new Client('909.638.819-49'));
  const orderRepository = new OrderRepository(new MemoryDB<Order>());
  orderRepository.add(validOrder);
  expect(
    _.isEqual(orderRepository.get(validOrder.id), validOrder)
  ).toBeTruthy();
});
