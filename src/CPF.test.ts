import { CPF, InvalidCPF } from './CPF';

test('Deve criar um objeto CPF', () => {
  const cpf = new CPF('659.634.004-06');
  expect(cpf.value).toBe('659.634.004-06');
});

test('Deve lançar uma exceção caso valor do cpf seja inválido', () => {
  expect(() => new CPF('cpf-invalido')).toThrow(InvalidCPF);
});
