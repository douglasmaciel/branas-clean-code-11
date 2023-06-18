import _ from 'lodash';
import { MemoryDB } from './MemoryDB';

test('Deve armazenar um objeto', () => {
  const key = 'user 1';
  const a = { nome: 'teste' };
  const m = new MemoryDB();
  m.add(key, a);
  expect(m.has(key)).toBeTruthy();
});

test('Deve recuperar um objeto armazenado', () => {
  const key = 'user 1';
  const a = { name: 'teste' };
  const m = new MemoryDB();
  m.add(key, a);
  expect(_.isEqual(m.get(key), a)).toBeTruthy();
});
