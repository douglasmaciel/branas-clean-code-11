import { Client } from './Client';

test('Deve criar um cliente', () => {
  const client = new Client('id-client', '659.634.004-06');
  expect(client.id).toBe('id-client');
  expect(client.cpf).toBe('659.634.004-06');
});

test('Deve lançar uma exceção caso CPF seja inválido', () => {
  expect(() => new Client('id-client', 'cpf-invalido')).toThrow();
});
