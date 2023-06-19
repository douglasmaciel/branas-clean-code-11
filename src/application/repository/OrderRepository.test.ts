import _ from 'lodash';
import { Client } from '../../domain/entity/Client';
import { Order } from '../../domain/entity/Order';
import { MemoryDB } from '../../infra/persistence/MemoryDB';
import { OrderRepository } from './OrderRepository';

test('Deve armazenar um pedido', () => {
  const o = new Order('id-order', new Client('909.638.819-49'));
  const or = new OrderRepository(new MemoryDB<Order>());
  or.add(o);
  expect(_.isEqual(or.get(o.id), o)).toBeTruthy();
});
