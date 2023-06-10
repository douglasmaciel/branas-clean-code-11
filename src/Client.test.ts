import { Client } from './Client';

test('Deve criar um cliente', () => {
  const client = new Client('659.634.004-06');
  expect(client.cpf).toBe('659.634.004-06');
});

test('Deve lançar uma exceção caso CPF seja inválido', () => {
  expect(() => new Client('cpf-invalido')).toThrow();
});
