import { CPF, InvalidCPF } from './CPF';

test.each(['659.634.004-06', '179.019.480-60', '693.650.144-33'])(
  'Deve criar um objeto CPF',
  (cpf) => {
    const validCPF = new CPF(cpf);
    expect(validCPF.value).toBe(cpf);
  }
);

test.each([
  '',
  'cpf-invalido',
  '659.634.00406',
  '659634.004-06',
  '659.634.004-16',
  '659.634.004-09',
  '111.111.111-11',
])('Deve lançar uma exceção caso valor do cpf seja inválido', (cpf) => {
  expect(() => new CPF(cpf)).toThrow(InvalidCPF);
});

test('Devem ser iguais CPFs com o mesmo valor', () => {
  const cpf1 = new CPF('659.634.004-06');
  const cpf2 = new CPF('659.634.004-06');
  expect(cpf1.isEqualTo(cpf2)).toBe(true);
});
