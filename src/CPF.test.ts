import { CPF, InvalidCPF } from './CPF';

test('Deve criar um objeto CPF', () => {
  const cpf = new CPF('659.634.004-06');
  expect(cpf.value).toBe('659.634.004-06');
});

test('Deve lançar uma exceção caso valor do cpf seja inválido', () => {
  expect(() => new CPF('cpf-invalido')).toThrow(InvalidCPF);
  expect(() => new CPF('659.634.00406')).toThrow(InvalidCPF);
  expect(() => new CPF('659634.004-06')).toThrow(InvalidCPF);
  expect(() => new CPF('659.634.004-16')).toThrow(InvalidCPF);
  expect(() => new CPF('659.634.004-09')).toThrow(InvalidCPF);
  expect(() => new CPF('111.111.111-11')).toThrow(InvalidCPF);
});

test('Devem ser iguais CPFs com o mesmo valor', () => {
  const cpf1 = new CPF('659.634.004-06');
  const cpf2 = new CPF('659.634.004-06');
  expect(cpf1.isEqualTo(cpf2)).toBe(true);
});
