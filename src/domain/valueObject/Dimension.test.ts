import { Dimension, InvalidLength, InvalidWeight } from './Dimension';

test('Deve criar um objeto dimensão', () => {
  const dimension = new Dimension(20, 15, 10, 1);
  expect(dimension.height).toBe(20);
  expect(dimension.width).toBe(15);
  expect(dimension.depth).toBe(10);
  expect(dimension.weight).toBe(1);
});

test('Deve calcular o volume (metros cúbicos) de um objeto dimensão', () => {
  const dimension = new Dimension(20, 15, 10, 1);
  expect(dimension.volume).toBe((20 * 15 * 10) / Math.pow(100, 3));
});

test.each([
  [0, 10, 15, 10],
  [20, 0, 15, 10],
  [20, 10, 0, 10],
  [-1, 10, 15, 10],
  [20, -2, 15, 10],
  [20, 10, -5, 10],
  [330, 10, 15, 10],
  [20, 400, 15, 10],
  [20, 10, 301, 10],
])(
  'Deve lançar exceção caso um dos comprimentos seja inválido',
  (h, w, d, wg) => {
    expect(() => new Dimension(h, w, d, wg)).toThrow(InvalidLength);
  }
);

test.each([
  [10, 10, 15, 0],
  [10, 10, 15, -1],
  [10, 10, 15, 130],
])('Deve lançar exceção caso o peso seja inválido', (h, w, d, wg) => {
  expect(() => new Dimension(h, w, d, wg)).toThrow(InvalidWeight);
});
